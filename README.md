# DB Care AI

AI 기반 DB 고객문의 1차 상담 시스템. 고객 문의 접수 → 추가 정보 수집 → 분류 → 엔지니어 이관을 체험하는 정적 웹 MVP입니다. 실제 운영 DB를 연결하거나 제어하지 않습니다.

## 주요 기능

- 한국어 텍스트 상담 및 Web Speech API 음성 입력, 선택적 TTS
- Oracle 오류별 질문과 Rule 기반 자동 분류 / 요약
- 고객사 및 DB 버전 선택, 긴급 표현 감지, 운영 변경 요청 즉시 이관
- Dashboard KPI, 검색, 상태 필터, 문의 상세 / 원문 / 대화 / 환경 정보
- 엔지니어 메모 저장, 상태 변경, 요약 텍스트 다운로드
- LocalStorage 영속 저장, 샘플 5건, 데모 데이터 초기화
- 모바일·PC 반응형, 키보드 입력 / 모달, 외부 유료 API 및 백엔드 없음

## 지원 Oracle 오류

| 코드 | 분류 | 수집 정보 |
|---|---|---|
| ORA-12514 | DB 접속 장애 | SERVICE_NAME, Listener, DB Instance |
| ORA-28000 | 계정 Lock | DB 계정명 |
| ORA-01653 | Tablespace 부족 | Tablespace, AUTOEXTEND, 사용률 |
| ORA-19809 | FRA 부족 | DB_RECOVERY_FILE_DEST_SIZE, FRA 사용률, Archive Log Backup |
| ORA-01017 | 인증 오류 | Username, 비밀번호 변경 여부, 비밀번호 제외 접속 문자열, 다른 환경 접속 |

추가 유형: Listener 장애, 성능 저하, 백업/복구, 기타 DB 문의. 모르는 정보는 ‘확인 불가’로 입력할 수 있습니다.

## 기술 스택과 구조

React 19, Vite 7, JavaScript, 기본 CSS, Lucide 아이콘. Node.js 22.12 이상 권장.

```text
src/
  components/UI.jsx
  pages/Consultation.jsx
  pages/Dashboard.jsx
  services/aiService.js
  data/oracleErrors.js
  data/sampleTickets.js
  utils/storage.js
```

`aiService.js`의 비동기 `respond(session, input)` 인터페이스를 교체하면 향후 API 연결이 가능합니다. 오류 지식과 질문은 `oracleErrors.js`에서 관리합니다.

## 로컬 실행

```sh
npm ci
npm run dev
```

표시된 localhost URL을 엽니다. 검증 및 프로덕션 미리보기:

```sh
npm test
npm run build
npm run preview
```

## GitHub Pages 배포

1. 공개 저장소 `db-care-ai-mvp`를 만들고 이 프로젝트를 `main`에 push합니다.
2. 저장소 Settings → Pages → Build and deployment → Source에서 **GitHub Actions**를 선택합니다.
3. Actions에서 **Deploy DB Care AI to Pages** 실행 또는 main에 push합니다.
4. 완료 후 Pages에서 제공되는 공개 URL을 엽니다.

Vite `base: './'`는 저장소 하위 경로와 다른 정적 호스팅에서 모두 상대 경로로 자산을 로드합니다. 탭은 클라이언트 상태로 관리하므로 추가 경로가 생기지 않으며 새로고침 시 서버 라우팅이 필요하지 않습니다. `dist/`만 정적 호스팅에 올릴 수 있습니다.

## 대표 데모

AI 상담에서 ORA-12514 시나리오 선택 → `PROD 입니다.` → `Listener는 정상입니다.` → `OPEN입니다.` → Dashboard 확인. SERVICE_NAME=PROD, Listener=정상, DB Instance=OPEN 및 예상 확인 항목이 저장됩니다.

## MVP 범위 및 안전

- AI는 규칙에 따라 정해진 질문과 확인 항목을 제공합니다. 실제 추론, 진단 보장, RAG 검색, 전화 연결, 엔지니어 알림은 Mock 범위입니다.
- 저장 위치는 동일 브라우저·동일 origin의 LocalStorage뿐입니다. 실제 팀 공유 시스템이 아닙니다. 브라우저 저장 차단·초과 시 안내합니다.
- 비밀번호 / 실제 개인정보 / 운영 로그의 민감정보를 입력하지 마세요. 현재 버전은 인증·암호화·민감정보 자동 제거 기능이 없습니다.
- Web Speech 인식은 브라우저 지원 및 마이크 권한이 필요합니다. Chrome에서도 네트워크·환경에 따라 실패할 수 있으며, 인식 서비스에 음성이 전송될 수 있습니다. 텍스트만으로 모든 상담이 가능합니다.
- ALTER SYSTEM, ALTER DATABASE, DROP, SHUTDOWN, STARTUP, KILL SESSION, ALTER USER, Datafile 변경, Tablespace Resize를 실행하는 기능은 전혀 없습니다. 관련 요청은 엔지니어 확인 필요로 이관합니다.
- 샘플은 가상 고객사입니다. 시간은 최초 샘플 생성일 기준이며 이후에는 실제 접수 날짜를 유지합니다.

## 향후 개발 방향

### Phase 2
- 실제 LLM API 연동 (서버 경유, 브라우저에 API 키 노출 금지)
- RAG 기반 사내 장애 대응 문서 검색
- 사내 FAQ 연계

### Phase 3
- 실제 전화 시스템 연동
- STT/TTS 고도화
- 상담 내용 자동 티켓 생성

### Phase 4
- 고객사 DB 환경정보 연계
- 기술지원 시스템 연동
- 장애 사례 Knowledge Base 구축

상용화에는 SSO / 역할별 접근 제어, 서버 저장소, 암호화와 보존 정책, 민감정보 마스킹, 감사 로그, AI 응답 평가, 사람이 승인하는 이관·변경 관리 절차가 추가로 필요합니다.

