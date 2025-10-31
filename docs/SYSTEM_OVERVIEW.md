# System Overview

AlgoIdentity issues organization-backed Digital IDs as Algorand Standard Assets (ASA). Access to apps or events is verified by checking token ownership and policy rules enforced by smart contracts.

## Components
- Smart Contracts (PyTeal): issue_contract, verify_contract, revoke_contract
- Backend (e.g., FastAPI): REST routes to orchestrate contract interactions
- Frontend (React): Admin + User dashboards, Verify flow, QR scanner
- Wallets: Pera Wallet / AlgoSigner
- Database (Optional): MongoDB for org/user metadata

## Data Flow
1. Admin requests ID issuance via backend
2. Backend calls PyTeal app/ASA logic using an Algorand client/library
3. ASA minted/opted-in to user wallet
4. Verifier checks ASA ownership via contract rules
5. Revoke freezes or clawbacks per policy

## Environments
- Local dev (Algorand TestNet)
- Staging (TestNet)
- Production (MainNet when ready)
