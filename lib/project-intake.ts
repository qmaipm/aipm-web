import { createHash, randomUUID } from "node:crypto";
import { mkdir, open, link, unlink, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { PROPERTY_TYPES, CONTACT_STAGES, EMPTY_ASSESSMENT, POLICY, ROLES, scoreProject, validateAssessment, type Assessment, type Role } from "./delegated-policy";

export type Intake = {
  requestId: string; name: string; phone: string; company: string;
  project: string; city: string; propertyType: string; owner: string;
  relationship: string; need: string; contactStage: string; role: Role;
  strategic: boolean; consent: boolean; source: string; assessment: Assessment;
};
export type IntakeRecord = {
  receipt: string; createdAt: string; status: "submitted"; policyVersion: string;
  fingerprint: string; intake: Intake; assessment: ReturnType<typeof scoreProject>;
};
export function parseIntake(input: unknown): Intake {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("提交格式不正确。");
  const v = input as Record<string, unknown>;
  if (v.website) throw new Error("提交未通过验证。");
  if (typeof v.requestId !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(v.requestId)) throw new Error("请刷新页面后重新提交。");
  const text = (key: string, max: number, required = true) => {
    const s = v[key];
    if (typeof s !== "string" || s.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s)) throw new Error("文字内容格式或长度不正确。");
    if (required && !s.trim()) throw new Error("请补齐必填项目资料和联系方式。");
    return s.trim();
  };
  const phone = text("phone", 32);
  if (!/^\+?[\d ()-]{7,32}$/.test(phone) || phone.replace(/\D/g, "").length < 7) throw new Error("请填写有效的联系电话。");
  const propertyType = text("propertyType", 40);
  const contactStage = text("contactStage", 80);
  if (!(PROPERTY_TYPES as readonly string[]).includes(propertyType) || !(CONTACT_STAGES as readonly string[]).includes(contactStage)) throw new Error("请选择项目业态和沟通进展。");
  if (typeof v.role !== "string" || !Object.hasOwn(ROLES, v.role)) throw new Error("请选择预计项目角色。");
  if (v.consent !== true || typeof v.strategic !== "boolean") throw new Error("请确认信息授权与资料使用说明。");
  const error = validateAssessment(v.assessment);
  if (error) throw new Error(error);
  const a = v.assessment as Assessment;
  // Whitelist fields; client-supplied grade, reward and protection dates are never trusted.
  const assessment = Object.fromEntries(Object.keys(EMPTY_ASSESSMENT).map((k) => [k, a[k as keyof Assessment]])) as Assessment;
  return {
    requestId: v.requestId.toLowerCase(), name: text("name", 80), phone,
    company: text("company", 160, false), project: text("project", 200), city: text("city", 80),
    propertyType, owner: text("owner", 200), relationship: text("relationship", 1200), need: text("need", 2000),
    contactStage, role: v.role as Role, strategic: v.strategic, consent: true,
    source: text("source", 200, false), assessment,
  };
}
export function intakeDirectory(): string {
  const configured = process.env.PROJECT_INTAKE_DIR;
  if (!configured || !path.isAbsolute(configured)) throw new Error("Project intake requires an absolute persistent private directory");
  const dir = path.resolve(configured);
  for (const forbidden of ["public", ".next", ".git"]) {
    const rel = path.relative(path.resolve(process.cwd(), forbidden), dir);
    if (!rel || (!rel.startsWith(`..${path.sep}`) && rel !== ".." && !path.isAbsolute(rel))) throw new Error("Project records must not be web-accessible");
  }
  return dir;
}
export function intakeEnabled(): boolean {
  if (process.env.PROJECT_INTAKE_ENABLED !== "true" || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.MAIL_TO) return false;
  try { intakeDirectory(); return true; } catch { return false; }
}
export const recordKey = (requestId: string) => createHash("sha256").update(requestId).digest("hex");
export async function saveIntake(intake: Intake): Promise<{ record: IntakeRecord; duplicate: boolean }> {
  const dir = intakeDirectory();
  await mkdir(dir, { recursive: true, mode: 0o700 });
  const destination = path.join(dir, `${recordKey(intake.requestId)}.json`);
  const fingerprint = createHash("sha256").update(JSON.stringify(intake)).digest("hex");
  const record: IntakeRecord = {
    receipt: `DP-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase()}`,
    createdAt: new Date().toISOString(), status: "submitted", policyVersion: POLICY.version,
    fingerprint, intake, assessment: scoreProject(intake.assessment),
  };
  // Complete and fsync a private temporary file, then atomically install without overwriting.
  const temp = path.join(dir, `.${randomUUID()}.tmp`);
  const file = await open(temp, "wx", 0o600);
  try { await file.writeFile(JSON.stringify(record, null, 2)); await file.sync(); }
  finally { await file.close(); }
  try {
    await link(temp, destination);
    return { record, duplicate: false };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    const existing: IntakeRecord = JSON.parse(await readFile(destination, "utf8"));
    if (existing.fingerprint !== fingerprint) throw new Error("REQUEST_ID_CONFLICT");
    return { record: existing, duplicate: true };
  } finally { await unlink(temp).catch(() => {}); }
}
export async function notifyIntake(record: IntakeRecord): Promise<boolean> {
  const marker = path.join(intakeDirectory(), `${recordKey(record.intake.requestId)}.notified`);
  try { await readFile(marker); return true; } catch { /* notification pending */ }
  try {
    const port = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.qiye.aliyun.com", port, secure: port === 465,
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER, to: process.env.MAIL_TO, cc: process.env.MAIL_CC || undefined,
      subject: `委托管理项目待受理 ${record.receipt}`,
      text: `受理编号：${record.receipt}\n时间：${record.createdAt}\n状态：已保存，待人工核验\n请在部署服务器的受理台账中查看项目并反馈伙伴。\n命令：node scripts/project-intake-ops.cjs show ${record.receipt}\n本邮件不包含客户经营资料。报备通过前不启动项目保护。`,
    });
    await writeFile(marker, new Date().toISOString(), { mode: 0o600 });
    return true;
  } catch {
    // Do not log SMTP credentials, submitted contact details, or financial data.
    console.error(`[project-intake] notification pending: ${record.receipt}`);
    return false;
  }
}
