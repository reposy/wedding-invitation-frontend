# Frontend Docs (React)

최신 선호 스택을 기준으로 최소 문서 뼈대입니다. 세부 구현이 진행되면 각 문서를 확장합니다.

- architecture.md: 스택, 폴더 구조, 라우팅, 빌드
- state-management.md: 서버/클라이언트 상태 관리 표준
- components.md: 섹션 컴포넌트 레지스트리/프로퍼티 스키마
- animation.md: 모션 원칙과 트리거, 라이브러리 선택
- style-guide.md: Tailwind 기반 스타일 가이드
- api-consumption.md: API 소비 규칙과 응답 래퍼, 에러 처리
- build-deploy.md: 빌드/배포/환경변수
- testing-strategy.md: 테스트 도구/전략
- accessibility-performance.md: 접근성/성능 체크리스트

관리자(Admin) UI는 React SPA(`/admin`)로 가정합니다. 공개(청첩장) 뷰도 React 구성 시 동일 규칙을 따릅니다.

## Quick Start
1) 환경변수
```
frontend/app/.env
VITE_API_BASE_URL=http://localhost:8080
```
2) 의존성 설치/실행
```
cd frontend/app
npm i
npm run dev
```
3) 빌드/린트
```
npm run build
npm run lint
```

Root: `frontend/app/src`
