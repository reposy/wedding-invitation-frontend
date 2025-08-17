# API Consumption

## Base
- Base URL: `/api/v1`
- 응답 래퍼: `{ success, data, error }`

## Errors
- `error.code` 기반 분기(예: `WEDDING_NOT_FOUND`, `SYSTEM_VALIDATION_ERROR`)
- 네트워크/서버 오류: 재시도 제한, 사용자 메시지 표준화

## Types
- 백엔드 DTO와 동형의 TypeScript 타입을 정의하고 공용 모듈에서 재사용

## Uploads
- S3 presigned URL 정책(선택), 진행률/취소/재시도

## 샘플 엔드포인트
- GET `/invitations/{invitationCode}`: 섹션 데이터/순서
- GET `/invitations/{invitationId}/guestbook-entries` (+page/size/sort)
- POST `/invitations/{invitationId}/guestbook-entries`
