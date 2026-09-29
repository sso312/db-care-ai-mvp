import React from 'react';
import {ArrowUpRight,CheckCircle2,Clock3,Headphones,MessageCircle,ShieldCheck,PhoneCall} from 'lucide-react';
import {PageTitle,Badge} from '../components/UI.jsx';
const paths=[
 ['접속이 안 됩니다','ORA-12514 또는 서비스 연결 오류가 발생했어요.','DB 접속이 안되고 ORA-12514 오류가 발생합니다.','높음'],
 ['계정이 잠겼습니다','ORA-28000 또는 로그인 실패를 확인합니다.','계정이 잠겼고 ORA-28000 오류가 발생합니다.','보통'],
 ['공간이 부족합니다','Tablespace 또는 FRA 여유 공간을 확인합니다.','Tablespace가 부족하고 ORA-01653 오류가 발생합니다.','보통'],
 ['기타 기술 문의','오류 코드나 현재 증상을 직접 입력합니다.','Oracle Database 기술 지원이 필요합니다.','보통']
];
const statusType=s=>s==='처리 완료'?'green':s==='접수 대기'?'neutral':'amber';
export default function CustomerPortal({tickets,onStart,onConsult}){
 const mine=tickets.filter(t=>!t.sample).slice(0,3);
 return <><PageTitle eyebrow="CUSTOMER SUPPORT PORTAL" title="문제를 빠르게 접수하고, 진행 상황을 확인하세요." description="DB 환경을 바꾸지 않습니다. 필요한 정보만 수집해 담당 엔지니어에게 안전하게 전달합니다."><Badge type="green"><CheckCircle2 size={13}/>평균 2분 내 접수</Badge></PageTitle>
 <section className="customer-hero panel"><div><span className="section-kicker">GUIDED INTAKE</span><h2>어떤 도움이 필요하신가요?</h2><p>가장 가까운 상황을 선택하면 AI가 필요한 정보만 차례로 확인합니다.</p></div><div className="customer-trust"><ShieldCheck size={20}/><span><strong>안전한 상담</strong><small>비밀번호·접근 토큰은 자동 마스킹</small></span></div></section>
 <section className="customer-paths">{paths.map(([title,desc,text,priority])=><button key={title} className="customer-path panel" onClick={()=>onStart(text)}><span className="path-icon"><MessageCircle size={19}/></span><span><strong>{title}</strong><small>{desc}</small><em className={priority==='높음'?'urgent':''}>{priority==='높음'?'긴급 접수':'일반 접수'}</em></span><ArrowUpRight size={18}/></button>)}</section>
 <section className="customer-support panel"><div><span className="section-kicker">CALL SUPPORT</span><h2>말로 설명하는 편이 더 편하신가요?</h2><p>브라우저 음성 상담은 고객의 답변을 받아 적고 AI가 다음 질문을 음성으로 안내합니다.</p></div><button className="button call-button" onClick={onConsult}><PhoneCall size={16}/>전화 상담 시작</button></section>
 <section className="customer-status panel"><div className="table-heading"><div><span className="section-kicker">MY RECENT REQUESTS</span><h2>최근 문의</h2><p>접수 이후에도 담당자와 처리 상태를 확인할 수 있습니다.</p></div><button className="text-button enabled" onClick={onConsult}>새 문의 <ArrowUpRight size={14}/></button></div>{mine.length?<div className="request-list">{mine.map(t=><div key={t.id} className="request-row"><span className="request-id">#{t.id.slice(0,8)}</span><div><strong>{t.category} · {t.code}</strong><small>{new Date(t.createdAt).toLocaleString('ko-KR',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'})} · {t.channel||'WEB'}</small></div><Badge type={statusType(t.status)}>{t.status}</Badge></div>)}</div>:<div className="customer-empty"><Clock3 size={22}/><span>아직 접수된 문의가 없습니다. 위에서 증상을 선택해 시작해보세요.</span></div>}</section>
 <section className="customer-promise"><div><Headphones size={20}/><span><strong>고객에게는 명확한 다음 단계</strong><small>접수 → 정보 확인 → 엔지니어 검토 → 처리 결과 안내</small></span></div><div><CheckCircle2 size={20}/><span><strong>회사에는 일관된 운영 데이터</strong><small>채널, 심각도, SLA, 담당자, 변경 승인 이력을 하나의 티켓으로 관리</small></span></div></section></>;
}

