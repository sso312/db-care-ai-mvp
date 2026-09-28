const q = (key, text) => ({key, text});
export const oracleErrors = {
 'ORA-12514': {category:'DB 접속 장애',description:'Listener 서비스 등록 확인',questions:[q('SERVICE_NAME','현재 접속에 사용 중인 SERVICE_NAME을 알려주세요.'),q('Listener','Listener가 현재 정상적으로 실행 중인지 확인 가능하신가요?\n가능하다면 lsnrctl status 결과를 확인해주세요.'),q('DB Instance','DB Instance 상태가 OPEN 상태인지 확인해주세요.')],checkItems:['Listener Service Registration','SERVICE_NAME 설정','LOCAL_LISTENER','Dynamic Service Registration']},
 'ORA-28000': {category:'계정 Lock',description:'계정 잠금 상태 확인',questions:[q('Username','사용 중인 DB 계정명을 알려주세요. 비밀번호는 입력하지 마세요.')],checkItems:['DBA_USERS ACCOUNT_STATUS','FAILED_LOGIN_ATTEMPTS','PROFILE','ALTER USER ACCOUNT UNLOCK 여부 (엔지니어 검토)']},
 'ORA-01653': {category:'Tablespace 부족',description:'테이블스페이스 여유 공간 확인',questions:[q('Tablespace','어떤 Tablespace에서 발생했나요?'),q('AUTOEXTEND','Datafile AUTOEXTEND가 설정되어 있나요?'),q('Tablespace 사용률','현재 Tablespace 사용률을 알려주세요. 확인이 어렵다면 “확인 불가”로 답해주세요.')],checkItems:['DBA_DATA_FILES','DBA_FREE_SPACE','AUTOEXTEND','MAXSIZE','Datafile 추가 또는 Resize 검토 (엔지니어 작업)']},
 'ORA-19809': {category:'FRA 부족',description:'복구 영역 용량 확인',questions:[q('DB_RECOVERY_FILE_DEST_SIZE','DB_RECOVERY_FILE_DEST_SIZE 설정값을 알려주세요.'),q('FRA 사용률','현재 FRA 사용률을 알려주세요.'),q('Archive Log Backup','Archive Log Backup을 최근 수행했나요?')],checkItems:['V$RECOVERY_FILE_DEST','V$FLASH_RECOVERY_AREA_USAGE','RMAN Backup','Archive Log 정리 여부 (엔지니어 검토)']},
 'ORA-01017': {category:'인증 오류',description:'접속 인증 정보 확인',questions:[q('Username','사용 중인 Username을 알려주세요. 비밀번호는 입력하지 마세요.'),q('Password 변경 여부','최근 Password 변경이 있었나요? 비밀번호 자체는 입력하지 마세요.'),q('접속 문자열','비밀번호를 제외한 접속 문자열(host:port/service)을 알려주세요.'),q('다른 환경 접속','동일 계정으로 다른 환경에서는 접속이 가능한가요?')],checkItems:['Username / 접속 대상 확인','최근 Password 변경 이력','접속 문자열 설정','환경별 인증 차이 확인']}
};
export const genericRules = [
 {pattern:/listener|리스너/i,category:'Listener 장애',questions:[q('Listener','Listener 상태와 오류 메시지를 알려주세요.')],checkItems:['Listener 상태','Listener 로그','서비스 등록 상태']},
 {pattern:/lock|잠금|잠겼/i,...oracleErrors['ORA-28000']},
 {pattern:/tablespace|테이블스페이스/i,...oracleErrors['ORA-01653']},
 {pattern:/FRA|복구 영역/i,...oracleErrors['ORA-19809']},
 {pattern:/느림|느려|느린|성능|지연/i,category:'성능 저하',questions:[q('발생 시점','성능 저하가 시작된 시점과 영향을 받는 업무를 알려주세요.'),q('영향 범위','특정 SQL에서 발생하나요, 전체 업무에서 발생하나요?')],checkItems:['대기 이벤트','SQL 실행 계획','자원 사용률','최근 변경 이력']},
 {pattern:/백업|복구|RMAN/i,category:'백업/복구',questions:[q('작업 종류','백업 또는 복구 중 어떤 작업에서 발생했나요?'),q('오류 로그','오류 메시지와 발생 시점을 알려주세요.')],checkItems:['RMAN 로그','백업 상태','복구 요구사항 (RPO / RTO)']},
 {pattern:/접속|연결|로그인|DOWN/i,category:'DB 접속 장애',questions:[q('접속 오류','오류 코드 또는 정확한 오류 메시지를 알려주세요.'),q('영향 범위','모든 사용자가 접속할 수 없나요? 발생 시점도 알려주세요.')],checkItems:['접속 문자열','네트워크 연결','Listener / DB 상태']}
];
export const fallback = {category:'기타 DB 문의',questions:[q('상세 증상','발생 시점과 구체적인 증상을 알려주세요.'),q('영향 범위','영향받는 업무와 최근 변경 사항이 있나요?')],checkItems:['증상 및 영향 범위 확인','관련 로그 검토','담당 엔지니어 추가 분석']};
export const scenarios = [
 ['ORA-12514','DB 접속 장애','DB 접속이 안되고 ORA-12514 오류가 발생합니다.'],
 ['ORA-28000','계정 Lock','ORA-28000이 발생하고 로그인이 안됩니다.'],
 ['ORA-01653','Tablespace 부족','ORA-01653 오류로 테이블에 데이터를 추가할 수 없습니다.'],
 ['ORA-19809','FRA 부족','ORA-19809 오류가 발생했습니다.'],
 ['ORA-01017','인증 오류','ORA-01017 오류로 로그인이 안됩니다.']
];

