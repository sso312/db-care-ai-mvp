export function aiAssessment(session){
 const known=session.rule?.code&&session.rule.code!=='—';
 return {confidence:known?'높음':'검토 필요',confidenceReason:known?'오류 코드와 운영 질문 흐름이 일치합니다.':'오류 코드 또는 증상 근거가 부족해 엔지니어 검토가 필요합니다.',recommendedAction:session.rule?.description||'수집된 증상과 로그를 기준으로 담당 엔지니어가 원인을 확인합니다.',knowledgeScope:known?'Oracle 오류 코드 플레이북':'일반 DB 장애 분류 플레이북'};
}

