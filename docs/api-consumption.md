# API 소비 가이드 (Frontend)

## 기본 URL
- `.env`의 `VITE_API_BASE_URL`을 설정합니다(예: http://localhost:8080).
- 모든 엔드포인트는 `/api/v1/**` 하위에 위치합니다.

## 표준 응답 래퍼
- 형태: `{ success: boolean, data: T | null, error: { code: string, message: string } | null }`
- `data`를 읽기 전에 항상 `success`를 확인합니다.

## 오류 처리
- 400: 검증 오류 → 필드별 메시지가 있으면 표시; 에러 코드는 `SYSTEM_VALIDATION_ERROR`
- 422: 도메인 오류 → `GUESTBOOK_*`, `INVITATION_*` 등 사용자 친화 메시지 매핑
- 500: 일반 오류 → 폴백 메시지 표시; 사용자 지원 시 `X-Request-Id` 포함

## Request-Id
- 응답 헤더의 `X-Request-Id`를 읽어 오류 로그와 함께 기록합니다(지원/추적용).

## 시간/로케일
- 서버 시간은 ISO-8601(UTC) `OffsetDateTime`입니다. UI에서 명시적으로 변환/표시합니다.

## 방명록 플로우
- 생성: POST `/invitations/{invitationId}/guestbook` with `{ author, password, content }`
  - 비밀번호는 클라이언트에 저장하지 않습니다. 이 동작에 한해 메모리에만 유지합니다.
- 답글: POST `/invitations/{invitationId}/guestbook/{id}/replies`
- 수정: PATCH `/invitations/{invitationId}/guestbook/{id}` with `{ password, content }`
- 삭제: DELETE `/invitations/{invitationId}/guestbook/{id}` with `{ password }`
  - 쓰레드가 있으면 자식부터 삭제해야 합니다.
- 목록(플랫): GET `/invitations/{invitationId}/guestbook`
- 목록(쓰레드): GET `/invitations/{invitationId}/guestbook?threaded=true`

## 예시 Fetch 래퍼 (TypeScript)
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
