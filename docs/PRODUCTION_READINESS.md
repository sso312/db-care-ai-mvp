# DB Care AI production rollout

This repository is a browser pilot. Set `VITE_SUPPORT_API_URL` only after a company-owned API provides the contract below.

## Required services

1. Company SSO via OIDC or SAML; map roles to `customer`, `support-agent`, `db-engineer`, and `admin`.
2. An authenticated `POST /v1/support-tickets` API that persists encrypted tickets, returns the created ID, and writes immutable audit events.
3. A telephony gateway (for example Genesys Cloud, Amazon Connect, or Twilio) that sends signed webhooks to a server-side call-orchestrator. Browser Web Speech is a pilot assist feature, not a PSTN integration.
4. A company-approved LLM gateway with DLP/redaction before model calls, tenant isolation, retention controls, and an allowlisted knowledge base.
5. Centralized monitoring: API latency/error rate, call outcome, ticket escalation SLA, audit export, and on-call alerting.

## Ticket API minimum contract

`POST /v1/support-tickets` accepts the ticket object emitted by `toTicket`. The endpoint must require an authenticated user session, ignore client-supplied role/status changes that are not allowed, add server timestamps and user identity, and return the persisted ticket.

## Before launch

- Perform security review and penetration test.
- Set retention periods for call transcripts and tickets.
- Define incident severity, escalation targets, and business-hours routing.
- Test outage scenarios and webhook retries in a non-production environment.
- Obtain privacy/legal approval before enabling call recording or external AI processing.

