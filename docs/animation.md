# Animation & Interaction

## 원칙
- 지속시간: 150–400ms, 과도한 모션 지양
- 이징: 표준 가속-감속(`easeInOut`)
- 사용자 설정의 "감소된 모션" 존중(`prefers-reduced-motion`)

## 트리거
- 뷰포트 진입(Intersection Observer 또는 Framer Motion `whileInView`)
- 스크롤 기반 페럴랙스는 transform만 사용하여 60fps 유지

## 라이브러리
- Framer Motion: 섹션 리빌/상태 전환
- Swiper: 갤러리 스와이프/라이트박스(필요 시)

## 기본 패턴
- 시퀀셜 리빌: 상단→하단, 작은 오프셋(24–48ms) 지연
- D-Day 카운트: 숫자 카운트업/다운 전용 모션
- Cover 페럴랙스: 이미지 느린 스크롤, 텍스트 페이드/슬라이드인
