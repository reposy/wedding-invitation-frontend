# 테마 관리

## 선택 메커니즘
- 초대장 생성(관리자) 단계에서 테마 선택(예: 'romantic' 또는 'elderly').
- 선택값은 초대장 데이터에 저장(백엔드 API).
- 프론트는 초대장 API로 테마를 가져와 Context 또는 props로 적용합니다.

## 통합 방식
- Tailwind 유틸 + data-attribute 또는 CSS Modules로 테마 클래스를 관리합니다.
- 컴포넌트 props: `theme?: 'romantic' | 'elderly'`
- 관리자 UI: 섹션별 템플릿 선택/조합 폼을 제공합니다.

## 전환/미리보기
- 동적 미리보기: URL 파라미터 `?theme=elderly`를 허용하되, 기본값은 API 값을 사용합니다.

CSS 변수 + data attribute 기반의 최소 테마 전략만 정의합니다.

---

## 접근 방식
- `:root`에 CSS 변수를 선언합니다.
- `document.documentElement`에 `[data-theme="X"]`를 설정하여 테마별로 오버라이드합니다.

## 최소 변수
```css
:root {
  --theme-primary: #eab308;
  --theme-background: #ffffff;
  --theme-text: #111827;
}
[data-theme="romantic"] {
  --theme-primary: #ec4899;
  --theme-background: #fdf2f8;
}
```

## 테마 타입
```ts
type Theme = {
  id: string;
  name: string;
  colors: { primary: string; background: string; text: string };
  variants?: { id: string; overrides: Partial<Theme> }[];
};
```

## 적용
```ts
document.documentElement.setAttribute('data-theme', themeId);
```

## 비고
- 선택값 저장은 localStorage를 사용합니다(민감정보 제외).
- 상세 프리셋/커스터마이저 구현은 관리자 단계에서 진행합니다.
