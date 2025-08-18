# State Management

## 원칙
- Server state ↔ TanStack Query
- UI/ephemeral state ↔ Zustand slices
- 전역 싱글톤/컨텍스트 남용 금지

## Query
- QueryClient 전역 1개
- 키 컨벤션: `['invitations','byCode', code]`, `['guestbook','list', invitationId, page]`
- 에러: 전역 ErrorBoundary + 토스트 정책
- 재시도: 네트워크 오류만 제한적 시도, 4xx는 즉시 실패

### Mutation & Invalidation
- guestbook.create/update/delete/reply 성공 시 `['guestbook','list', invitationId]` 무효화
- 422 도메인 오류는 사용자 메시지 표시, 400 검증 오류는 필드별 피드백 표시
- 비밀번호는 메모리에서만 사용하고 즉시 폐기

## Mutations
- 낙관적 업데이트는 UI 중요도 높은 경우에만, 실패 시 확실한 롤백

## UI State(Zustand)
- 모달/드로어/테마/프리뷰 상태 등 일시적 상태만 저장
- 서버 파생 데이터는 Query 캐시를 단일 소스로 사용

## 보안/개인정보
- 방명록 비밀번호는 클라이언트 저장 금지(local/sessionStorage 금지)
- 네트워크/콘솔 로그에 비밀번호를 남기지 않는다
