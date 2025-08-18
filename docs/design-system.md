# Design System

목표: 모바일 청첩장 UI를 위한 최소 토큰과 규칙만 정의합니다. 상세 샘플/구현 코드는 각 컴포넌트/스타일 파일에서 관리합니다.

---

## Tokens (minimum)
- Colors: primary, neutral, semantic
- Typography: family, size scale, line-height, weight
- Spacing: small set
- Radius/Shadow: small set

```css
:root {
  /* colors */
  --color-primary-500: #eab308;
  --color-neutral-900: #171717;
  --color-success: #22c55e;
  --color-error: #ef4444;

  /* typography */
  --font-family-primary: "Pretendard Variable", system-ui, sans-serif;
  --text-3xl: 1.875rem; /* h2 */
  --text-base: 1rem;
  --text-sm: 0.875rem;
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --font-medium: 500;
  --font-bold: 700;

  /* spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* radius/shadow */
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

## Usage rules
- Headline: `--text-3xl + --font-bold + --leading-tight`
- Body: `--text-base + --leading-normal`
- Section spacing: `--space-8` between sections
- Touch targets: min 44px; inputs/buttons ≥ 44px
- Accessibility: text contrast ≥ 4.5:1 (3:1 for large text); focus visible outline
- Dark mode: respect `prefers-color-scheme: dark` with color variable overrides

## Notes
- 상세/확장 토큰은 테마별 파일에서 정의합니다.
- 샘플 CSS/컴포넌트 코드는 문서에 포함하지 않습니다.
