# Theme Management

CSS 변수 + data attribute 기반의 최소 테마 전략만 정의합니다.

---

## Approach
- CSS variables under `:root`
- Override per theme with `[data-theme="X"]` on `document.documentElement`

## Minimal variables
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

## Theme shape
```ts
type Theme = {
  id: string;
  name: string;
  colors: { primary: string; background: string; text: string };
  variants?: { id: string; overrides: Partial<Theme> }[];
};
```

## Apply
```ts
document.documentElement.setAttribute('data-theme', themeId);
```

## Notes
- 선택 저장은 localStorage로(민감정보 제외)
- 상세 프리셋/커스터마이저 구현은 관리자 단계에서 진행
