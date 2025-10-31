# API Reference (FastAPI)

Base URL: /api

- POST /issue-id
  - body: { orgId, recipientAddress, metadata }
  - result: { assetId, txId }

- GET /verify-id
  - query: { address, assetId }
  - result: { valid: boolean, reason?: string }

- DELETE /revoke-id
  - body: { assetId, address, reason }
  - result: { txId }

- POST /org/register
  - body: { orgId, name, issuerAddress }

- POST /user/register
  - body: { userId, address }

Errors use JSON { error, details? } with proper HTTP codes.
