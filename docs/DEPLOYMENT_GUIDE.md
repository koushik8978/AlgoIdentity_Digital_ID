# Deployment Guide

## Recommended Layout
- Frontend (this repo): React + Tailwind → Netlify or Vercel
- Backend (Python repo): e.g., FastAPI + PyTeal → Render/Railway/Fly.io

## Steps
1. Frontend: configure API base URL env (e.g. VITE_API_URL)
2. Backend: configure Algorand TestNet creds and issuer keys (.env)
3. CI/CD: GitHub Actions for lint/test/build
4. Provision domains and HTTPS

## Netlify/Vercel
- Connect repo, set build: `pnpm build`, output dir: `dist/spa`
- Set env vars in provider dashboard

## Backend
- Use Poetry/uv/venv
- Use your preferred tooling for contract compile/deploy
- Expose REST endpoints per API_REFERENCE.md
