import {oracleErrors,genericRules,fallback} from '../data/oracleErrors.js';
import {operationalProfile,dueAt} from './operations.js';
export const greeting='안녕하세요. DB Care AI입니다.\n\n데이터베이스 사용 중 발생한 문제를 말씀해주세요.\n오류 메시지나 ORA 오류 코드가 있다면 함께 알려주세요.';
export const safetyText='AI는 1차 문의 접수와 정보 수집을 지원하며, 운영 DB에 영향을 주는 변경 작업은 담당 DB 엔지니어의 검토 후 수행합니다.';
export const isChangeRequest = t => /ALTER\s+(SYSTEM|DATABASE|USER)|\bDROP\b|SHUTDOWN|STARTUP|KILL\s+SESSION|(?:datafile|데이터파일).*(?:변경|추가|resize)|(?:tablespace|테이블스페이스).*resize/i.test(t);
export const urgency = t => /전체\s*접속\s*불가|서비스\s*중단|DB\s*DOWN|모든\s*사용자.*접속\s*불가/i.test(t) ? '높음' : '보통';
export function classify(text){
 const code=text.match(/ORA-\d{5}/i)?.[0].toUpperCase()||'—';
 return {code,...(oracleErrors[code]||genericRules.find(r=>r.pattern.test(text))||fallback)};
}
export const newSession=()=>({messages:[{role:'assistant',text:greeting}],rule:null,answers:{},index:0,done:false,original:'',priority:'보통'});
function clean(key,text){
 if(key==='SERVICE_NAME') return text.replace(/\s*(입니다|이에요|예요)[.!。]?$/,'').trim();
 if(key==='Listener' && /정상/.test(text)&& !/비정상|정상.*아니/.test(text)) return '정상';
 if(key==='DB Instance'&&/\bOPEN\b/i.test(text)) return 'OPEN';
 return text;
}
export async function respond(session,input){
 const text=input.trim(); if(!text||session.done)return session;
 const next={...session,messages:[...session.messages,{role:'user',text}],answers:{...session.answers}};
 next.priority=urgency(text)==='높음'?'높음':session.priority;
 let reply;
 if(isChangeRequest(text)){
   next.rule=session.rule||classify(text); next.original=session.original||text; next.done=true;
   next.answers['변경 요청']=text;
   reply='운영 DB에 영향을 주는 명령은 실행하지 않습니다. DB 엔지니어 확인 필요 상태로 이관하겠습니다.';
 }else if(!session.rule){
   next.rule=classify(text);next.original=text;
   reply=`${next.rule.category==='DB 접속 장애'?'DB 접속 관련 문의':next.rule.category+' 문의'}로 확인했습니다.\n\n장애 분석을 위해 몇 가지 정보를 확인하겠습니다.\n\n${next.rule.questions[0].text}`;
 }else{
   const question=session.rule.questions[session.index];next.answers[question.key]=clean(question.key,text);next.index++;
   next.done=next.index>=next.rule.questions.length;
   reply=next.done?'확인 감사합니다.\n\n현재 문의 내용을 DB 엔지니어에게 전달할 수 있도록 정리했습니다.\n엔지니어 Dashboard에서 접수 결과를 확인하실 수 있습니다.':next.rule.questions[next.index].text;
 }
 next.messages.push({role:'assistant',text:reply});return next;
}
export function toTicket(session,customer,version,channel='WEB'){
 const createdAt=new Date().toISOString(),ops=operationalProfile(session.priority,session.original);
 return {id:crypto.randomUUID(),createdAt,customer:customer.trim()||'Demo Customer',version,category:session.rule.category,code:session.rule.code,priority:session.priority,status:'엔지니어 확인 필요',channel,original:session.original,answers:session.answers,checkItems:session.rule.checkItems,messages:session.messages,note:'',impact:session.priority==='높음'?'서비스 영향 가능성 높음 — 엔지니어 확인 필요':session.rule.category==='DB 접속 장애'?'사용자 DB 접속 불가':'고객 문의 원문 및 수집 정보 참조',...ops,slaDueAt:dueAt(createdAt,ops.slaMinutes),audit:[{at:createdAt,actor:'AI Intake',action:`${channel} 상담 접수`,detail:`${ops.severity} · SLA ${ops.slaMinutes}분`}]} ;
}

