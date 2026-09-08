"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CHOICES, EMPTY_ASSESSMENT, POLICY, PARTNER_PATH, PROPERTY_TYPES, CONTACT_STAGES, ROLES, scoreProject, estimateReturns, validateAssessment, money, percent, type Assessment, type Role } from "@/lib/delegated-policy";

import { PROJECT_CHOICES, COOPERATION_DIRECTIONS, PROJECT_SECTIONS, assessmentInputValue, assessmentDisplayValue } from "@/lib/delegated-presentation";

const initialContact = { name:"", phone:"", company:"", project:"", city:"", propertyType:"", owner:"", relationship:"", need:"", contactStage:"", source:"", website:"" };
type Contact = typeof initialContact;
const events = new Set(["assessment_start","assessment_complete","report_start","report_submit"]);
export default function ProjectTool({enabled,analyticsEnabled=false}:{enabled:boolean;analyticsEnabled?:boolean}) {
 function track(event: string) {
 if (analyticsEnabled && events.has(event)) {
  window._hmt = window._hmt || [];
  window._hmt.push(["_trackEvent", "delegated_partner", event, `policy_v${POLICY.version}`]);
 }
}
 const [step,setStep]=useState(0);
 const [assessment,setAssessment]=useState<Assessment>({...EMPTY_ASSESSMENT});
 const [role,setRole]=useState<Role>("refer");
 const [strategic,setStrategic]=useState(false);
 const [fixed,setFixed]=useState(""); const [efficiency,setEfficiency]=useState(""); const [months,setMonths]=useState("36");
 const [contact,setContact]=useState<Contact>(initialContact);
 const [consent,setConsent]=useState(false); const [review,setReview]=useState(false);
 const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 const [receipt,setReceipt]=useState<{receipt:string;notification:string}|null>(null);
 const request=useRef<{snapshot:string;id:string}|null>(null);
 const panel=useRef<HTMLDivElement>(null); const started=useRef(false);
 const scoreError=validateAssessment(assessment);
 const result=scoreProject(scoreError?EMPTY_ASSESSMENT:assessment);
 const direction=result.grade?COOPERATION_DIRECTIONS[result.grade]:null;
 const sections=PROJECT_SECTIONS.map(section=>({...section,complete:section.keys.every(key=>assessment[key]!==null)}));
 let estimate:ReturnType<typeof estimateReturns>|null=null;
 let estimateError="";
 if(result.grade && fixed!=="" && efficiency!=="") {
  try { estimate=estimateReturns(result.grade,role,strategic,Number(fixed)*10000,Number(efficiency)*10000,Number(months)); }
  catch(e){estimateError=(e as Error).message;}
 }
 const policyEstimate=result.grade?estimateReturns(result.grade,role,strategic,0,0,12):null;
 function go(next:number){
  if(busy||receipt)return;
  if(scoreError){setError(scoreError);return;}
  setError("");setStep(next);setReview(false);
  if(next===1&&result.grade)track("assessment_complete");
  if(next===2)track("report_start");
  window.setTimeout(()=>{panel.current?.focus();panel.current?.scrollIntoView({block:"start",behavior:"auto"});},0);
 }
 function update(key:keyof Assessment,value:string){
  if(!started.current){started.current=true;track("assessment_start");}
  setAssessment(a=>({...a,[key]:assessmentInputValue(key,value)}));setError("");
 }
 const numeric=(key:keyof Assessment,label:string,hint:string,max:number,stepValue="any")=><div className="dp-field" key={key}><label htmlFor={`dp-${key}`}>{label}</label><input id={`dp-${key}`} type="number" inputMode="decimal" min={key==="area"?0.01:0} max={max} step={stepValue} value={assessmentDisplayValue(key,assessment[key])} onChange={e=>update(key,e.target.value)} aria-describedby={`hint-${key}`} placeholder="暂不清楚可留空"/><small id={`hint-${key}`}>{hint}</small></div>;
 const choice=(key:keyof typeof CHOICES)=>{
  const copy=PROJECT_CHOICES[key];
  const labels:Readonly<Record<number,string>>=copy.labels;
  return <div className="dp-field" key={key}>
   <label htmlFor={`dp-${key}`}>{copy.question}</label>
   <select id={`dp-${key}`} value={assessment[key]??""} onChange={e=>update(key,e.target.value)} aria-describedby={`hint-${key}`}>
    <option value="">不清楚</option>
    {CHOICES[key].map(([value])=><option key={value} value={value}>{labels[value]}</option>)}
   </select>
   <small id={`hint-${key}`}>{copy.hint}</small>
  </div>;
 };
 const text=(key:keyof Contact,label:string,max:number,required=true,textarea=false)=><div className="dp-field" key={key}><label htmlFor={`dp-contact-${key}`}>{label}{required?" *":"（选填）"}</label>{textarea?<textarea id={`dp-contact-${key}`} maxLength={max} required={required} value={contact[key]} onChange={e=>setContact(c=>({...c,[key]:e.target.value}))}/>:<input id={`dp-contact-${key}`} type={key==="phone"?"tel":"text"} autoComplete={key==="name"?"name":key==="phone"?"tel":key==="company"?"organization":"off"} required={required} maxLength={max} value={contact[key]} onChange={e=>setContact(c=>({...c,[key]:e.target.value}))}/>}</div>;
 const selectText=(key:"propertyType"|"contactStage",label:string,options:readonly string[])=><div className="dp-field"><label htmlFor={`dp-contact-${key}`}>{label} *</label><select id={`dp-contact-${key}`} required value={contact[key]} onChange={e=>setContact(c=>({...c,[key]:e.target.value}))}><option value="">请选择</option>{options.map(v=><option key={v}>{v}</option>)}</select></div>;
 const roleInput=<div className="dp-field"><label htmlFor="dp-role">预计参与角色</label><select id="dp-role" value={role} onChange={e=>setRole(e.target.value as Role)}>{Object.entries(ROLES).map(([k,r])=><option key={k} value={k}>{r.label}</option>)}</select><small>{ROLES[role].work}。最终角色需书面确认。</small></div>;
 function preview(e:FormEvent<HTMLFormElement>){e.preventDefault();if(scoreError){setError(scoreError);return;}setReview(true);setError("");window.setTimeout(()=>panel.current?.focus(),0);}
 async function submit(){
  if(!enabled||busy)return;
  if(!consent){setError("请先确认信息授权与资料使用说明。");return;}
  const data={...contact,assessment,role,strategic,consent};const snapshot=JSON.stringify(data);
  if(!request.current||request.current.snapshot!==snapshot)request.current={snapshot,id:crypto.randomUUID()};
  setBusy(true);setError("");
  try{
   const response=await fetch("/api/delegated-project",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,requestId:request.current.id})});
   const body=await response.json();
   if(!response.ok||!body.ok) {if(response.status===409)request.current=null;throw new Error(body.error||"未能提交，请稍后重试。");}
   setReceipt({receipt:body.receipt,notification:body.notification});track("report_submit");
   setContact(initialContact);setAssessment({...EMPTY_ASSESSMENT});setFixed("");setEfficiency("");
  }catch(e){setError(e instanceof Error?e.message:"网络连接中断。请重试，系统会避免重复保存同一次提交。");}
  finally{setBusy(false);}
 }
 return <section className="dp-tool" id="project-tool"><div className="wrap">
  <noscript><p className="dp-message">查看合作方向与在线报备需要启用 JavaScript。也可致电 020-8985 3580 联系受理人，或下载白皮书查看规则。</p></noscript>
  <ol className="dp-stepnav" aria-label="项目评估步骤">{["01 项目情况","02 合作方向","03 提交报备"].map((t,i)=><li key={t}><button type="button" disabled={busy||!!receipt} aria-current={step===i?"step":undefined} onClick={()=>go(i)}>{t}</button></li>)}</ol>
  <div className="dp-tool-grid">
   <div className="dp-form-panel" ref={panel} tabIndex={-1}>
    {error&&<p className="dp-message" role="alert">{error}</p>}
    {receipt?<div className="dp-review" role="status"><span className="dp-eyebrow">资料已保存 / 待人工核验</span><h2>已收到你的项目资料</h2><p>请保留受理编号，便于后续联系。</p><p className="dp-receipt">{receipt.receipt}</p><p>回执不代表项目报备已通过，也不启动保护期。受理人核验资料、查重后，将通过你提供的联系方式反馈。</p>{receipt.notification==="pending"&&<p className="dp-message">资料已保存，通知受理人的邮件暂未送达。无需重复报备，也可致电并提供受理编号。</p>}<p><a href="tel:02089853580">020-8985 3580</a></p><Link href={PARTNER_PATH}>返回发展伙伴计划</Link></div>:<>
    {step===0&&<><h2 className="dp-step-title">填写你已经了解的项目情况</h2><p className="dp-small">按实际情况填写，不清楚就跳过。提交报备前，资料只在当前页面使用；刷新后会清除。</p>
     <fieldset><legend>01 位置与配套</legend>{choice("location")}{choice("transport")}{choice("amenities")}{choice("strategy")}</fieldset>
     <fieldset><legend>02 面积与现有收入</legend>{numeric("area","实际管理面积（㎡）","只填实际管理范围。统一委托、可共同运营的项目可合并。",1e9)}{numeric("revenue","现有物业年收入（万元／年）","如年收入 300 万，填 300。只计当前可确认收入，不含预测增收或启盟酬金。",1e8)}</fieldset>
     <fieldset><legend>03 入住率与收入保障</legend>{numeric("occupancy","实际入住率（%）","如已入住约八成，填 80。",100)}{choice("guarantee")}</fieldset>
     <fieldset><legend>04 固定服务人员</legend>{numeric("staff","目前有多少固定服务人员（人）","含自有人员和长期固定外包人员，不含临时施工人员。",1e6,"1")}</fieldset>
     {scoreError&&<p className="dp-message" role="alert">{scoreError}</p>}
     <div className="dp-actions"><button className="btn btn-primary" type="button" onClick={()=>go(1)}>查看合作方向</button><button className="btn btn-ghost" type="button" onClick={()=>go(2)}>先报备，后补资料</button></div>
    </>}
    {step===1&&<><span className="dp-eyebrow">合作方向参考</span><h2 className="dp-step-title">{direction?direction.label:"一起了解合作方向"}</h2><p className="dp-direction-copy">{direction?direction.description:"资料尚未填全，可以先补充，也可以直接报备。"}</p><p className="dp-small">根据当前填写信息形成，不评价物业品质，也不代表合作准入或收益承诺。</p><div className="dp-actions dp-owner-action"><Link className="btn btn-primary" href="/contact?type=delegated-owner&from=project-tool">沟通合作需求</Link></div><details className="dp-disclosure dp-earnings"><summary>伙伴收益情景（选看）</summary><p className="dp-small">推荐项目的伙伴可展开查看报酬情景。业主无需填写。</p>{roleInput}<label className="dp-checkbox"><input type="checkbox" checked={strategic} onChange={e=>setStrategic(e.target.checked)}/><span>拟申请 S 战略标签<small style={{display:"block"}}>需提供正式证明材料并经专项确认。勾选只用于比较情景，不代表标签已获批。</small></span></label>
     {!result.grade?<p className="dp-message">资料尚未填全，暂不能形成合作方向或收益情景。可返回补充，也可直接报备。</p>:result.grade==="reserve"?<p className="dp-message">当前信息尚不适用标准奖励与分润测算。可先沟通合作需求，具体条件与报酬另行书面确认。</p>:<>
      <h3>{ROLES[role].label} · 政策参考</h3>
      <dl className="dp-money-list"><div><dt>不含 S 标签的开业奖励</dt><dd>{money(estimateReturns(result.grade,role,false,0,0,12).opening)}</dd></div>{strategic&&<div><dt>S 标签获批情景的开业奖励</dt><dd>{money(policyEstimate!.opening)}</dd></div>}<div><dt>固定酬金分润比例</dt><dd>{percent(policyEstimate!.fixedRate)}</dd></div><div><dt>提效酬金分润比例</dt><dd>{percent(policyEstimate!.efficiencyRate)}</dd></div></dl>
      <p className="dp-small">标准政策不是应付金额。开业奖励需满足合同生效、正式进场、运营启动及首笔固定管理酬金回款条件。</p>
      <h3>有酬金假设时，再算金额</h3>
      <div className="dp-field"><label htmlFor="dp-fixed">预计固定管理酬金（万元／年）</label><input id="dp-fixed" type="number" inputMode="decimal" min="0" max="100000000" step="any" value={fixed} onChange={e=>setFixed(e.target.value)} placeholder="未知时不必填写"/></div>
      <div className="dp-field"><label htmlFor="dp-efficiency">提效管理酬金情景（万元／年）</label><input id="dp-efficiency" type="number" inputMode="decimal" min="0" max="100000000" step="any" value={efficiency} onChange={e=>setEfficiency(e.target.value)} placeholder="可填 0 查看无提效酬金情景"/><small>这里只做情景演算。实际计提需成果达到约定条件，并经客户确认。不填写项目总体降本金额。</small></div>
      <div className="dp-field"><label htmlFor="dp-months">情景期限（月）</label><input id="dp-months" type="number" min="1" max={POLICY.maxMonths} step="1" value={months} onChange={e=>setMonths(e.target.value)}/><small>自正式运营起最长连续 36 个月；应使用实际有效合同期限。</small></div>
      {estimateError&&<p className="dp-message" role="alert">{estimateError}</p>}
      {estimate&&<div className="dp-message" aria-live="polite"><b>假设酬金每年相同、满足全部形成条件并全额回款</b><dl className="dp-money-list"><div><dt>一次开业奖励{strategic?"（S 获批情景）":""}</dt><dd>{money(estimate.opening)}</dd></div><div><dt>{months} 个月固定酬金分润</dt><dd>{money(estimate.fixed)}</dd></div><div><dt>{months} 个月提效酬金分润</dt><dd>{money(estimate.efficiency)}</dd></div><div><dt>情景合计，非收益承诺</dt><dd>{money(estimate.total)}</dd></div></dl><p className="dp-small">实际回款不足时同比例支付，合同与费用调整按正式文件执行。此测算不生成合同，不决定项目最终权益。酬金假设不随报备提交。</p></div>}
     </>}
     </details>
     <div className="dp-actions"><button type="button" className="btn btn-ghost" onClick={()=>go(2)}>带着项目继续报备</button><button type="button" className="btn btn-ghost" onClick={()=>go(0)}>返回修改项目资料</button></div>
    </>}
    {step===2&&<><h2 className="dp-step-title">{review?"核对资料，再确认提交":"留下真实机会和你的联系方式"}</h2>
     {!enabled&&<p className="dp-message" role="status">在线报备暂未开放，当前可以了解合作方向并准备资料。请联系 <a href="tel:02089853580">020-8985 3580</a> 或 <a href="mailto:liuziwen@aipm.cn">liuziwen@aipm.cn</a>；电话或邮件沟通后仍需受理人书面确认归属。</p>}
     {review?<div className="dp-review"><dl>{[["你的姓名",contact.name],["联系电话",contact.phone],["公司或机构",contact.company||"个人伙伴"],["项目",`${contact.city} · ${contact.project}`],["业主或主体",contact.owner],["业态",contact.propertyType],["决策人联系",contact.contactStage],["关系与推进",contact.relationship],["主要需求",contact.need],["合作方向",direction?`${direction.label}，待核实`:"资料待补充"],["预计角色",ROLES[role].label],["S 标签",strategic?"拟申请，待专项确认":"未申请"]].map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><p className="dp-small">提交只生成受理回执。查重、身份与资料核验通过后，由启盟书面确认项目归属及保护期。</p><div className="dp-actions"><button type="button" className="btn btn-primary" disabled={!enabled||busy} onClick={submit}>{busy?"正在保存项目…":"确认并提交项目报备"}</button><button type="button" className="btn btn-ghost" disabled={busy} onClick={()=>setReview(false)}>返回修改</button></div></div>:<form onSubmit={preview}>
      <div className="dp-fields">{text("name","你的姓名",80)}{text("phone","联系电话",32)}</div>{text("company","公司或机构",160,false)}
      <div className="dp-fields">{text("city","项目所在城市",80)}{text("project","项目名称或可识别线索",200)}</div>{selectText("propertyType","项目业态",PROPERTY_TYPES)}{text("owner","业主或项目主体",200)}
      <p className="dp-small">可适当脱敏；识别信息不足时需补充资料，才能完成查重及归属确认。</p>
      {numeric("area","大致管理面积（㎡，可待补充）","与前面的项目情况共享，无需重复填写。",1e9)}
      {selectText("contactStage","与实际决策人的沟通进展",CONTACT_STAGES)}{text("relationship","已联系人员的职务、关系及推进情况",1200,true,true)}{text("need","当前需求、合同调整时机及需要的支持",2000,true,true)}{roleInput}
      <div className="dp-field"><label htmlFor="dp-source">从哪里了解这项合作（选填）</label><select id="dp-source" value={contact.source} onChange={e=>setContact(c=>({...c,source:e.target.value}))}><option value="">请选择</option>{["搜索引擎","AI 推荐","同行或朋友介绍","公众号或文章","展会或活动","已在推进合作","其他"].map(t=><option key={t}>{t}</option>)}</select></div>
      <div className="dp-honeypot" aria-hidden="true"><label htmlFor="dp-website">网站</label><input id="dp-website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={e=>setContact(c=>({...c,website:e.target.value}))}/></div>
      <p className="dp-small">资料仅用于项目评估、查重及合作联系，保存在非公开受理台账。请只提交有权提供的必要信息，不上传完整合同或无关个人资料。<a href="#data-notice">阅读完整资料使用说明与更正、删除方式</a>。</p>
      <label className="dp-checkbox"><input required type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>我已阅读资料使用说明，确认有权提供上述信息，并同意启盟为本次评估、报备及合作联系我。提交不代表项目已通过或取得保护。</span></label>
      {scoreError&&<p role="alert" className="dp-message">{scoreError}</p>}
      <div className="dp-actions"><button className="btn btn-primary" type="submit">核对报备资料</button><button className="btn btn-ghost" type="button" onClick={()=>go(0)}>返回项目情况</button></div>
     </form>}
    </>}
    </>}
   </div>
   {!receipt&&<aside className="dp-result" aria-label="合作方向与资料状态">
    <span className="dp-eyebrow">{step===0?"填写进度":"合作方向参考"}</span>
    <div role="status" aria-live="polite" aria-atomic="true">
     <h2 className="dp-direction-title">{step===0?(direction?"资料已就绪":"从已知情况开始"):direction?.label??"一起了解项目"}</h2>
     <p>{step===0?(direction?"可以查看合作方向，也可以继续修改资料。":"不清楚的内容可以跳过，之后再一起补充。"):direction?.description??"资料还不足以形成合作方向。可以先报备，再由双方补充核实。"}</p>
    </div>
    <dl className="dp-progress-list">{sections.map(section=><div key={section.label}><dt>{section.label}</dt><dd>{section.complete?"已填写":"待补充"}</dd></div>)}</dl>
    {step===0&&direction&&<button className="btn btn-primary" type="button" onClick={()=>go(1)}>查看合作方向</button>}
    {step!==0&&<p><Link className="dp-result-link" href="/contact?type=delegated-owner&from=project-tool">沟通合作需求 →</Link></p>}
    {step!==0&&<p>根据当前填写信息形成，不评价物业品质，也不代表合作准入或收益承诺。</p>}
    {strategic&&<p>S 标签：拟申请，待专项认定。</p>}
    <p><a href="#scoring-rules">了解资料口径</a></p>
   </aside>}
  </div>
 </div></section>;
}
