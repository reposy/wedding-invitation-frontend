# Architecture (Frontend)

## Stack
- React 18 + TypeScript
- Vite (build) + ESLint (typescript-eslint) + Prettier
- Tailwind CSS (UI)
- TanStack Query (server state), Zustand (UI state)
- Framer Motion (animation), Swiper (gallery)
- React Router (routing)

## Structure (초안)
```
frontend/
  src/
    app/                # 앱 셸/Provider 설정
    pages/              # 라우트 엔트리(관리자: /admin/*)
    features/           # 도메인 단위(예: invitations, guestbook)
    components/         # 재사용 컴포넌트(섹션/공통)
    hooks/              # 커스텀 훅
    api/                # API 클라이언트/타입
    store/              # Zustand 스토어
    styles/             # Tailwind config, CSS entry
```

## Routing
- 관리자 경로: `/admin/*`
- 공개(청첩장) 경로(선택): `/i/:invitationCode`

## Providers
- QueryClientProvider, RouterProvider, ThemeProvider(선택), Zustand(optional slices)

## Env
- Vite 환경변수는 `VITE_` 접두사 필수
- 예: `VITE_API_BASE_URL=/api/v1`

## Lint/Format
- typescript-eslint + prettier
