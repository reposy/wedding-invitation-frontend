import { Link, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

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

type CreateWeddingForm = { code: string; title: string }

type CreateInvitationForm = { weddingId: number; invitationCode: string }

function CreateWedding() {
	const { register, handleSubmit, formState } = useForm<CreateWeddingForm>({ defaultValues: { code: '', title: '' } })
	const onSubmit = async (values: CreateWeddingForm) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/weddings`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			})
			const requestId = res.headers.get('X-Request-Id') || undefined
			const body = await res.json()
			if (!body?.success) {
				alert(`생성 실패: ${body?.error?.message || 'Unknown error'}\nRequest-Id: ${requestId || '-'} `)
				return
			}
			alert(`생성 성공! id=${body.data?.id || ''} / Request-Id=${requestId || '-'} `)
		} catch (e: any) {
			alert(`요청 실패: ${e?.message || e}`)
		}
	}

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold">결혼식 생성</h2>
			<p className="mt-2 text-sm opacity-80">다음 단계에서 초대장을 연결합니다.</p>
			<form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="code" className="block text-sm font-medium mb-1">코드</label>
					<Input id="code" placeholder="예: WD-20250818-001" {...register('code', { required: true })} />
				</div>
				<div>
					<label htmlFor="title" className="block text-sm font-medium mb-1">제목</label>
					<Input id="title" placeholder="예: John & Jane Wedding" {...register('title', { required: true })} />
				</div>
				<Button type="submit" loading={formState.isSubmitting}>생성</Button>
			</form>
		</div>
	)
}

function CreateInvitation() {
	const { register, handleSubmit, formState } = useForm<CreateInvitationForm>({ defaultValues: { weddingId: undefined as any, invitationCode: '' } })
	const onSubmit = async (values: CreateInvitationForm) => {
		try {
			const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/invitations`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			})
			const requestId = res.headers.get('X-Request-Id') || undefined
			const body = await res.json()
			if (!body?.success) {
				alert(`생성 실패: ${body?.error?.message || 'Unknown error'}\nRequest-Id: ${requestId || '-'} `)
				return
			}
			const code = body.data?.invitationCode || values.invitationCode
			alert(`생성 성공! id=${body.data?.id || ''} / code=${code} / 링크=/i/${code} / Request-Id=${requestId || '-'} `)
		} catch (e: any) {
			alert(`요청 실패: ${e?.message || e}`)
		}
	}

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold">초대장 생성</h2>
			<p className="mt-2 text-sm opacity-80">웨딩 ID를 입력하고 초대장 코드를 지정하세요. (목록 API는 추후 추가 예정)</p>
			<form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="weddingId" className="block text-sm font-medium mb-1">웨딩 ID</label>
					<Input id="weddingId" type="number" placeholder="예: 1" {...register('weddingId', { required: true, valueAsNumber: true })} />
				</div>
				<div>
					<label htmlFor="invitationCode" className="block text-sm font-medium mb-1">초대장 코드</label>
					<Input id="invitationCode" placeholder="예: WDG-2025-JJ" {...register('invitationCode', { required: true })} />
				</div>
				<Button type="submit" loading={formState.isSubmitting}>생성</Button>
			</form>
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


