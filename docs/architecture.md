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
- 예: `VITE_API_BASE_URL=http://localhost:8080`

## API Entry
- 단일 진입점: `src/api/client.ts`
  - 표준 응답 래퍼 처리 `{ success, data, error }`
  - 응답 헤더 `X-Request-Id` 추출 및 로깅 연계
  - 모든 도메인 API는 이 유틸을 경유한다
- 도메인 모듈: `src/api/invitations.ts`, `src/api/guestbook.ts` 등
  - 경로는 `/api/v1/**` 사용
  - DTO 타입은 `src/types/api.ts`에서 공통 정의

## Structure Details
```
src/
  api/                # client.ts(단일 진입점), 도메인별 API 모듈
  types/              # API 래퍼/DTO 타입
  features/
    guestbook/        # feature단위 훅/컴포넌트/페이지(선택)
  components/         # 재사용 컴포넌트
  hooks/              # 공통 훅
  app/                # Providers(QueryClient, Router 등)
  pages/              # 라우팅 엔트리
```

## Lint/Format
- typescript-eslint + prettier
