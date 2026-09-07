#!/usr/bin/env node
// Private server-only intake desk. No HTTP route exposes records.
// PROJECT_INTAKE_DIR=... node scripts/project-intake-ops.cjs list|show RECEIPT|notify
// ... review RECEIPT accepted|needs-info|duplicate|declined OPERATOR NOTE
// accepted NOTE must identify the beneficiary and specific project; send confirmation to the partner separately.
const fs=require('node:fs/promises');const path=require('node:path');const mail=require('nodemailer');
(async()=>{
 const dir=process.env.PROJECT_INTAKE_DIR;
 if(!dir||!path.isAbsolute(dir))throw new Error('Set PROJECT_INTAKE_DIR to the private persistent absolute path.');
 const [command,id,decision,operator,...notes]=process.argv.slice(2);
 const files=(await fs.readdir(dir)).filter(f=>/^[a-f0-9]{64}\.json$/.test(f));
 for(const f of files){
  const record=JSON.parse(await fs.readFile(path.join(dir,f),'utf8'));
  const log=path.join(dir,f.replace('.json','.events.jsonl'));
  const events=await fs.readFile(log,'utf8').catch(()=> '');
  const latest=events.trim()?JSON.parse(events.trim().split('\n').at(-1)):null;
  if(command==='list')console.log(JSON.stringify({receipt:record.receipt,createdAt:record.createdAt,status:latest?.decision||record.status,notification:await fs.access(path.join(dir,f.replace('.json','.notified'))).then(()=> 'sent',()=> 'pending')}));
  else if(command==='show'&&id===record.receipt){console.log(JSON.stringify(record,null,2));console.log(events);return;}
  else if(command==='review'&&id===record.receipt){
   if(!['accepted','needs-info','duplicate','declined'].includes(decision)||!operator||!notes.length)throw new Error('Supply a valid decision, reviewer and a written note (beneficiary/project for acceptance).');
   const now=new Date();const end=new Date(now.getTime()+180*86400000);
   const event={at:now.toISOString(),decision,operator,note:notes.join(' '),...(decision==='accepted'?{protectionStart:now.toISOString(),protectionEnd:end.toISOString()}: {})};
   await fs.appendFile(log,JSON.stringify(event)+'\n',{mode:0o600});
   console.log('Review recorded. Send the written result to the partner; this command does not send confirmation.');return;
  }else if(command==='notify'){
   const marker=path.join(dir,f.replace('.json','.notified'));
   if(await fs.access(marker).then(()=>true,()=>false))continue;
   if(!process.env.SMTP_USER||!process.env.SMTP_PASS||!process.env.MAIL_TO)throw new Error('SMTP and recipient required.');
   const port=Number(process.env.SMTP_PORT||465);
   const transport=mail.createTransport({host:process.env.SMTP_HOST||'smtp.qiye.aliyun.com',port,secure:port===465,connectionTimeout:8000,socketTimeout:12000,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
   await transport.sendMail({from:process.env.SMTP_USER,to:process.env.MAIL_TO,subject:`代运营项目待受理 ${record.receipt}`,text:`资料已安全保存，受理编号 ${record.receipt}。请在私有台账中查看、审核并回复伙伴。`});
   await fs.writeFile(marker,new Date().toISOString(),{mode:0o600});console.log(`Notified ${record.receipt}`);
  }
 }
 if(!['list','notify'].includes(command))throw new Error('Unknown command or receipt.');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
