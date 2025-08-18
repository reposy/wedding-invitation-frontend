# API Consumption Guide (Frontend)

## Base URL
- Configure `VITE_API_BASE_URL` in `.env` (e.g., http://localhost:8080)
- All endpoints are under `/api/v1/**`

## Response Envelope
- Shape: `{ success: boolean, data: T | null, error: { code: string, message: string } | null }`
- Always check `success` before reading `data`.

## Errors
- 400: validation -> show field-level messages when available; code is `SYSTEM_VALIDATION_ERROR`
- 422: domain -> show user-friendly messages for `GUESTBOOK_*`, `INVITATION_*`, etc.
- 500: generic -> show fallback message; include `X-Request-Id` in user support channel

## Request-Id
- Read `X-Request-Id` from response headers and log it alongside errors for support.

## Time and Locale
- Server times are ISO-8601 (UTC) `OffsetDateTime`. Convert in UI as needed.

## Guestbook Flows
- Create: POST `/invitations/{invitationId}/guestbook` with `{ author, password, content }`
  - Do not persist password on client; keep it in memory for just this operation
- Reply: POST `/invitations/{invitationId}/guestbook/{id}/replies`
- Update: PATCH `/invitations/{invitationId}/guestbook/{id}` with `{ password, content }`
- Delete: DELETE `/invitations/{invitationId}/guestbook/{id}` with `{ password }`
  - If thread exists, delete children first
- List (flat): GET `/invitations/{invitationId}/guestbook`
- List (threaded): GET `/invitations/{invitationId}/guestbook?threaded=true`

## Example Fetch Wrapper (TypeScript)
```ts
export interface ApiResponse<T> { success: boolean; data: T | null; error: { code: string; message: string } | null }

export async function api<T>(path: string, init?: RequestInit): Promise<{ data: T | null; error: string | null; requestId?: string }>{
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  const requestId = res.headers.get('X-Request-Id') || undefined;
  const body: ApiResponse<T> = await res.json();
  if (!body.success) return { data: null, error: body.error?.message || 'Unknown error', requestId };
  return { data: body.data as T, error: null, requestId };
}
```
