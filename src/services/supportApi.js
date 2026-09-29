import {deploymentMode} from './security.js';
const endpoint=(import.meta.env||{}).VITE_SUPPORT_API_URL?.replace(/\/$/,'');
export async function submitTicket(ticket){
 if(!endpoint)return {mode:'PILOT',ticket};
 const response=await fetch(`${endpoint}/v1/support-tickets`,{method:'POST',headers:{'content-type':'application/json'},credentials:'include',body:JSON.stringify(ticket)});
 if(!response.ok)throw new Error(`Ticket API request failed: ${response.status}`);
 return {mode:deploymentMode,ticket:await response.json()};
}
export function apiStatus(){return {mode:deploymentMode,endpointConfigured:Boolean(endpoint)};}

