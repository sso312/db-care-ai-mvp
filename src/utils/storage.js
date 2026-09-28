import {sampleTickets} from '../data/sampleTickets.js';
const key='db-care-ai-tickets-v1';
export function loadTickets(){try{const raw=localStorage.getItem(key);if(!raw)return {tickets:sampleTickets()};const tickets=JSON.parse(raw);if(!Array.isArray(tickets)||tickets.some(t=>!t.id||!Array.isArray(t.messages)||!Array.isArray(t.checkItems)||!t.answers))throw Error();return {tickets};}catch{return {tickets:sampleTickets(),error:'저장된 데이터를 읽지 못했습니다. 샘플 데이터를 표시합니다.'};}}
export function saveTickets(tickets){try{localStorage.setItem(key,JSON.stringify(tickets));return '';}catch{return '브라우저 저장 공간에 저장하지 못했습니다. 현재 데이터는 새로고침 시 사라질 수 있습니다.';}}

