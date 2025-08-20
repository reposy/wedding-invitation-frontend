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

## 반응형 설계
- Tailwind 브레이크포인트: sm(모바일), md(태블릿), lg(데스크톱)
- iOS/Android 우선: 터치 제스처와 viewport 메타를 우선 고려
- iPad/PC 대응: 큰 화면에서는 레이아웃/타이포 크기를 스케일 조정

## Performance
- Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1
- Lazy-load below-the-fold; split by route
- Cache with React Query; avoid retrying 4xx
- 지연 로딩과 이미지 최적화 적용
- 에뮬레이터/실기기 테스트(Chrome DevTools 등)

## Images
- Use `<picture>` + `loading="lazy"`; set width/height to prevent CLS

## Network
- Prefetch critical next route; leverage HTTP caching
- Do not log sensitive data (e.g., passwords)

## Offline (optional)
- Service Worker can be added later; not required for initial release

## Monitoring (dev only)
- Web Vitals in development for diagnostics
