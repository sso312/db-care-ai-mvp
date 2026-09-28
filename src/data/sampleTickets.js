import {oracleErrors} from './oracleErrors.js';
export function sampleTickets(){return ['ORA-12514','ORA-01653','ORA-28000','ORA-19809','ORA-01017'].map((code,i)=>({
 id:`DEMO-${1048-i}`,createdAt:new Date(new Date().setHours(10-i,20+i*7,0,0)).toISOString(),customer:`Demo Customer ${['A','B','C','A','B'][i]}`,version:'Oracle Database 19c',category:oracleErrors[code].category,code,priority:i===0||i===3?'높음':'보통',status:['엔지니어 확인 필요','접수 대기','처리 완료','엔지니어 확인 필요','처리 완료'][i],original:`${code} 오류가 발생했습니다. 확인 부탁드립니다.`,answers:i===0?{'SERVICE_NAME':'PROD','Listener':'정상','DB Instance':'OPEN'}:{'환경 정보':'샘플 문의 — 추가 확인 필요'},checkItems:oracleErrors[code].checkItems,messages:[{role:'user',text:`${code} 오류가 발생했습니다.`},{role:'assistant',text:'문의 내용을 접수했습니다. 담당 엔지니어에게 이관합니다.'}],impact:i===0?'사용자 DB 접속 불가':'업무 영향 범위 확인 필요',note:'',sample:true
}));}

