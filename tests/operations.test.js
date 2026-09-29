import test from 'node:test';
import assert from 'node:assert/strict';
import {operationalProfile,dueAt,slaState} from '../src/services/operations.js';
test('high priority intake receives a 30 minute SEV-2 SLA',()=>{
 const profile=operationalProfile('높음','전체 접속 불가');
 assert.equal(profile.severity,'SEV-2');assert.equal(profile.slaMinutes,30);
});
test('change operations require engineer approval and overdue tickets are flagged',()=>{
 assert.equal(operationalProfile('보통','ALTER SYSTEM SET').approvalRequired,true);
 const ticket={status:'엔지니어 확인 필요',slaDueAt:dueAt('2026-01-01T00:00:00.000Z',30)};
 assert.equal(slaState(ticket,new Date('2026-01-01T01:00:00.000Z').getTime()),'초과');
});

