# Mobile Optimization

목표: 필수 체크리스트 중심의 간단 가이드.

---

## Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
```css
/* dynamic viewport */
.min-h-screen { min-height: 100dvh; }
```

## Touch
- Touch target ≥ 44×44px
- `touch-action: manipulation`
- `-webkit-tap-highlight-color: transparent`

## Performance
- Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Lazy-load below-the-fold; split by route
- Cache with React Query; avoid retrying 4xx

## Images
- Use `<picture>` + `loading="lazy"`; set width/height to prevent CLS

## Network
- Prefetch critical next route; leverage HTTP caching
- Do not log sensitive data (e.g., passwords)

## Offline (optional)
- Service Worker can be added later; not required for initial release

## Monitoring (dev only)
- Web Vitals in development for diagnostics
