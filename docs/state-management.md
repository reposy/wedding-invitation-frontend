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

## Mutations
- 낙관적 업데이트는 UI 중요도 높은 경우에만, 실패 시 확실한 롤백

## UI State(Zustand)
- 모달/드로어/테마/프리뷰 상태 등 일시적 상태만 저장
- 서버 파생 데이터는 Query 캐시를 단일 소스로 사용
