export function operationalProfile(priority,original=''){
 const high=priority==='높음'; const change=/ALTER\s+(SYSTEM|DATABASE|USER)|\bDROP\b|SHUTDOWN|STARTUP|KILL\s+SESSION/i.test(original);
 return {severity:high?'SEV-2':'SEV-3',slaMinutes:high?30:240,assignee:'미배정',approvalRequired:change,serviceImpact:high?'다수 사용자 또는 서비스 영향 가능':'제한적 사용자 영향 확인 필요'};
}
export function dueAt(createdAt,minutes){return new Date(new Date(createdAt).getTime()+minutes*60000).toISOString();}
export function slaState(ticket,now=Date.now()){
 if(ticket.status==='처리 완료')return '완료';if(!ticket.slaDueAt)return '미설정';return new Date(ticket.slaDueAt).getTime()<=now?'초과':'진행 중';
}

