# AlgoIdentity — Decentralized ID & Access Control System

AlgoIdentity is a production-grade plan for issuing and verifying blockchain-based Digital IDs (Algorand Standard Assets) with smart-contract–enforced access control.

This repository currently contains the React + Tailwind frontend scaffold with a modern landing page and placeholders for Dashboard and Verify flows. The backend and smart contracts should live in a separate repository.

## Tech Overview
- Smart contracts: PyTeal (issue / verify / revoke)
- Chain: Algorand TestNet
- Backend: Optional service layer (e.g., FastAPI) orchestrating blockchain operations
- Frontend: React + Tailwind (this repo)
- Wallets: Pera Wallet / AlgoSigner
- Database: MongoDB (optional)

## Tooling: Algorand SDK and AlgoKit

- Algorand SDK (algosdk, JavaScript) — installed in this repository and used by the frontend to:
  - Query network and ASA state via algod/indexer for read‑only views in Verify and Dashboard flows.
  - Build unsigned transactions (issue, revoke/freeze) that are handed to Pera Wallet for signing.
- AlgoKit (Python tooling) — used in the separate backend/contracts repository to:
  - Scaffold, compile, and deploy PyTeal smart contracts to TestNet/MainNet.
  - Provide a local sandbox and CI scripts for contract testing and deployments.

## Monorepo vs Split
We recommend keeping the Python backend in its own repo for clean CI/CD and to respect environment tooling. See `docs/DEPLOYMENT_GUIDE.md`.

## Next Steps
- Implement wallet connect and API wiring
- Build the backend service and smart contracts in a separate repo
- See the roadmap in `docs/README.md`

For detailed docs, see `/docs`.
