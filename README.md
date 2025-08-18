# frontend

## Quickstart

1) Env
```
VITE_API_BASE_URL=http://localhost:8080
```

2) Install & Run
```
npm ci
npm run dev
```

## API Usage
- All endpoints under `/api/v1/**`
- Standard response envelope: `{ success, data, error }`
- Read `X-Request-Id` from responses for debugging and support tickets

## Security
- Do not store guestbook passwords on the client (no local/sessionStorage). Use in memory for the current action only

## Docs
- See `frontend/docs/architecture.md`, `state-management.md`, `components.md`, `api-consumption.md`, `coding-standards.md`
