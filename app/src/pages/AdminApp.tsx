import { Link, Outlet, RouteObject, useRoutes } from 'react-router-dom'

function AdminHome() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-semibold">관리자 홈</h1>
			<p className="mt-2 text-sm opacity-80">결혼식/초대장 생성 화면으로 이동하세요.</p>
			<nav className="mt-4 flex gap-3">
				<Link to="weddings/new" className="underline">결혼식 생성</Link>
				<Link to="invitations/new" className="underline">초대장 생성</Link>
			</nav>
		</div>
	)
}

function CreateWedding() {
	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold">결혼식 생성</h2>
			<p className="mt-2 text-sm opacity-80">다음 단계에서 초대장을 연결합니다.</p>
			{/* TODO: 폼 구현 */}
		</div>
	)
}

function CreateInvitation() {
	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold">초대장 생성</h2>
			<p className="mt-2 text-sm opacity-80">테마/템플릿을 선택하세요.</p>
			{/* TODO: 폼 구현 */}
		</div>
	)
}

const routes: RouteObject[] = [
	{ path: '/', element: <AdminHome /> },
	{ path: 'weddings/new', element: <CreateWedding /> },
	{ path: 'invitations/new', element: <CreateInvitation /> },
]

export function AdminApp() {
	return (
		<div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100">
			<header className="border-b border-neutral-200/60 dark:border-neutral-800/60">
				<div className="mx-auto max-w-3xl p-4 flex items-center justify-between">
					<Link to="/admin" className="font-semibold">Wedding Admin</Link>
					<nav className="flex gap-4 text-sm">
						<Link to="/admin/weddings/new" className="underline">결혼식 생성</Link>
						<Link to="/admin/invitations/new" className="underline">초대장 생성</Link>
					</nav>
				</div>
			</header>
			<main className="mx-auto max-w-3xl">
				{useRoutes(routes)}
			</main>
		</div>
	)
}


