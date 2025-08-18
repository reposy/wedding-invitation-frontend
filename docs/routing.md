# Routing Strategy

최소 라우트 맵과 제약만 정의합니다.

---

## Routes
- `/admin/*`: 관리자 영역
- `/i/:invitationCode`: 공개 청첩장
- `*`: 404

## Minimal router
```tsx
const router = createBrowserRouter([
  { path: '/admin/*', element: <AdminApp /> },
  { path: '/i/:invitationCode', element: <InvitationPage /> },
  { path: '*', element: <NotFound /> },
]);
export const AppRouter = () => <RouterProvider router={router} />;
```

## Constraints
- Use `lazy()` for route components
- Guard `/admin/*` with `AuthGuard` (추후)
- Query keys: `['invitations','byCode', code]`, `['guestbook','list', invitationId]`
- Page components own SEO/meta tags
