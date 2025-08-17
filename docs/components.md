# Components

섹션 컴포넌트 레지스트리와 최소 props 스키마(초안). 섹션별 `variant`로 시각/모션 변형을 관리합니다.

## Registry (섹션 타입)
```
MAIN_COVER | GREETING | D_DAY | INTRODUCTION | GALLERY | WEDDING_INFO | MAP_TRAFFIC_INFO | CONTACT_ACCOUNT_INFO | GUESTBOOK
```

## 공통 규칙
- 모든 섹션은 `id`, `type`, `variant?`, `className?`를 수용
- 이미지에는 `alt` 제공(접근성)
- 섹션은 뷰포트 진입 시 순차 리빌을 기본으로 함

## Props 스켈레톤(요약)
- MAIN_COVER: `headline`, `subheadline?`, `heroImageUrl`, `ctaLabel?`, `ctaHref?`, `variant?`
- GREETING: `title?`, `message(markdown)`, `signature?`, `variant?`
- D_DAY: `weddingDateTime(ISO)`, `venueName?`, `showCountUpAfter?`, `variant?`
- INTRODUCTION: `bride{name,parents?}`, `groom{name,parents?}`, `story?`, `variant?`
- GALLERY: `images[{url,alt?,caption?}]`, `layout('masonry'|'grid')`, `autoplay?`, `variant?`
- WEDDING_INFO: `dateTime`, `venue{name,address}`, `hall?`, `seatMapUrl?`, `variant?`
- MAP_TRAFFIC_INFO: `coords|mapEmbedUrl`, `transportTips[{type,text}]`, `variant?`
- CONTACT_ACCOUNT_INFO: `contacts[{role,name,phone}]`, `accounts[{bank,owner,accountNo,copyEnabled}]`, `variant?`
- GUESTBOOK: `entries`, `pagination`, `allowReply?`, `variant?`

## 변형(Variants)
- 색/타이포/레이아웃 조합을 `variant` 문자열로 식별(`default`, `minimal`, `photo-centric` 등)

## 접근성
- 텍스트 대비 준수, 이미지 대체 텍스트, 키보드 포커스 가능한 컨트롤
