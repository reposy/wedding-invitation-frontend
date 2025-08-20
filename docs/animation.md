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

## 가이드라인(상세)

### 라이브러리
- Framer Motion: 선언적 애니메이션 구성에 사용합니다.

### 로맨틱 테마 전용 패턴
- 인트로: 제목이 왼쪽에서 한 글자씩 등장(staggerChildren 약 0.1s). 음악이 재생되고 나면 대표 이미지가 페이드인됩니다.
- 스크롤 전환: 아래로 스크롤 시 메인 화면이 오른쪽으로 날아가듯 퇴장(translateX(100%)). 위로 스크롤 시 반대 방향에서 재진입(translateX(-100%)). 스프링 이징 권장.
- 고령자 테마: 정적 또는 최소한의 페이드로 축소 적용.

### 권장 사항
- 뷰포트 기반 트리거를 사용합니다(`useInView`).
- 저사양 기기 또는 `prefers-reduced-motion` 환경에서는 모션을 비활성화/축소합니다.
