const patterns=[
 {name:'비밀번호',pattern:/((?:password|passwd|pwd|비밀번호)\s*[:=]\s*)\S+/gi,replacement:'$1[REDACTED]'},
 {name:'주민등록번호',pattern:/\b\d{6}-?[1-4]\d{6}\b/g,replacement:'[REDACTED-RRN]'},
 {name:'카드번호',pattern:/\b(?:\d[ -]*?){13,16}\b/g,replacement:'[REDACTED-CARD]'},
 {name:'접근 토큰',pattern:/\b(?:sk|api|access)[_-][A-Za-z0-9_-]{16,}\b/gi,replacement:'[REDACTED-TOKEN]'}
];
export function redactSensitive(text=''){
 let masked=String(text);let matched=[];
 for(const rule of patterns){if(rule.pattern.test(masked)){matched.push(rule.name);rule.pattern.lastIndex=0;masked=masked.replace(rule.pattern,rule.replacement)}}
 return {text:masked,matched};
}
const env=import.meta.env||{};
export const deploymentMode=env.VITE_SUPPORT_API_URL?'CONNECTED':'PILOT';

