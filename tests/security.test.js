import test from 'node:test';
import assert from 'node:assert/strict';
import {redactSensitive} from '../src/services/security.js';
test('masks password values before they enter a support ticket',()=>{
 const result=redactSensitive('password=Secret-123 ORA-01017');
 assert.equal(result.text,'password=[REDACTED] ORA-01017');
 assert.deepEqual(result.matched,['비밀번호']);
});
test('masks resident registration and token-like values',()=>{
 const result=redactSensitive('주민번호 900101-1234567 access_abcdEFGHijklMNOPqrst');
 assert.match(result.text,/\[REDACTED-RRN\]/);
 assert.match(result.text,/\[REDACTED-TOKEN\]/);
});

