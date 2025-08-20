import { Link, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'
import { createWedding, listWeddings } from '../api/weddings'
import { createInvitation } from '../api/invitations'
import type { Wedding } from '../types/api'
import { useToast } from '../app/ToastProvider'

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
	const { show } = useToast()
	const onSubmit = async (values: CreateWeddingForm) => {
		try {
			const { data, error, requestId } = await createWedding(values)
			if (error) return show(`생성 실패: ${error} (req: ${requestId || '-'})`, { type: 'error' })
			show(`생성 성공! id=${data?.id || ''}`)
		} catch (e: any) {
			show(`요청 실패: ${e?.message || e}`, { type: 'error' })
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
	const { register, handleSubmit, formState, setValue } = useForm<CreateInvitationForm>({ defaultValues: { weddingId: undefined as any, invitationCode: '' } })
	const [weddings, setWeddings] = useState<Wedding[] | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { show } = useToast()

	useEffect(() => {
		let mounted = true
		;(async () => {
			setLoading(true)
			const { data, error } = await listWeddings(0, 50)
			if (!mounted) return
			if (error) setError(error)
			setWeddings(data?.items || [])
			setLoading(false)
		})()
		return () => { mounted = false }
	}, [])

	const onSubmit = async (values: CreateInvitationForm) => {
		try {
			const { data, error, requestId } = await createInvitation(values)
			if (error) return show(`생성 실패: ${error} (req: ${requestId || '-'})`, { type: 'error' })
			const code = data?.invitationCode || values.invitationCode
			show(`생성 성공! code=${code}`)
		} catch (e: any) {
			show(`요청 실패: ${e?.message || e}`, { type: 'error' })
		}
	}

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold">초대장 생성</h2>
			<p className="mt-2 text-sm opacity-80">웨딩을 선택하고 초대장 코드를 지정하세요.</p>
			<form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="weddingId" className="block text-sm font-medium mb-1">웨딩</label>
					{loading ? (
						<p className="text-sm opacity-80">로딩 중…</p>
					) : error ? (
						<p className="text-sm text-red-600">목록을 불러오지 못했습니다: {error}</p>
					) : (
						<Select id="weddingId" defaultValue="" onChange={(e) => setValue('weddingId', Number(e.target.value), { shouldValidate: true })}>
							<option value="" disabled>웨딩을 선택하세요</option>
							{(weddings || []).map(w => (
								<option key={w.id} value={w.id}>{w.title} ({w.code})</option>
							))}
						</Select>
					)}
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


