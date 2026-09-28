import React from 'react';
import {ShieldCheck} from 'lucide-react';
import {safetyText} from '../services/aiService.js';
export function Badge({children,type=''}){return <span className={`badge ${type}`}>{children}</span>}
export function Safety(){return <div className="safety"><ShieldCheck size={18}/><span>{safetyText}</span></div>}
export function PageTitle({eyebrow,title,description,children}){return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{children}</div>}

