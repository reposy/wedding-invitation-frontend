import { Link, NavLink, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { useEffect, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'
import { createWedding, listWeddings } from '../api/weddings'
import { createInvitation } from '../api/invitations'
import type { Wedding } from '../types/api'
import { useToast } from '../app/ToastProvider'
import { WeddingList } from './WeddingList'
import { WeddingDetail } from './WeddingDetail'

function AdminHome() {
	return (
		<div className="p-6">
			<section className="mb-6">
				<h1 className="text-2xl font-semibold">관리자 대시보드</h1>
				<p className="mt-2 text-sm opacity-80">결혼식을 생성하고, 상세에서 초대장을 연결하세요.</p>
			</section>
			<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Link to="/admin/weddings" className="block rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm p-4 hover:shadow transition-shadow">
					<div className="text-lg font-medium">결혼식 목록</div>
					<p className="mt-1 text-sm opacity-80">생성한 결혼식을 확인하고, 상세에서 초대장을 만듭니다.</p>
				</Link>
				<Link to="/admin/weddings/new" className="block rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm p-4 hover:shadow transition-shadow">
					<div className="text-lg font-medium">결혼식 생성</div>
					<p className="mt-1 text-sm opacity-80">새로운 결혼식을 생성합니다.</p>
				</Link>
			</section>
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

function AdminNavLink({ to, end, children }: { to: string; end?: boolean; children: ReactNode }) {
	return (
		<NavLink
			to={to}
			end={end}
			className={({ isActive }) =>
				`block rounded-md px-3 py-2 transition-colors ${
					isActive
						? 'bg-pink-50 text-pink-700 dark:bg-neutral-800 dark:text-pink-400'
						: 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
				}`
			}
		>
			{children}
		</NavLink>
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
	{ path: 'weddings', element: <WeddingList /> },
	{ path: 'weddings/new', element: <CreateWedding /> },
	{ path: 'weddings/:id', element: <WeddingDetail /> },
	{ path: 'invitations/new', element: <CreateInvitation /> },
]

export function AdminApp() {
	return (
		<div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-900 dark:text-neutral-100">
			<header className="border-b border-neutral-200/60 dark:border-neutral-800/60">
				<div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
					<Link to="/admin" className="font-semibold">Wedding Admin</Link>
					<nav className="flex gap-2 text-sm">
						<NavLink to="/admin/weddings" className={({ isActive }) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-pink-600 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}>결혼식 목록</NavLink>
						<NavLink to="/admin/weddings/new" className={({ isActive }) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-pink-600 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}>결혼식 생성</NavLink>
						<NavLink to="/admin/invitations/new" className={({ isActive }) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-pink-600 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}>초대장 생성</NavLink>
					</nav>
				</div>
			</header>
			<div className="mx-auto max-w-5xl px-4 py-6 flex gap-6">
				<aside className="hidden md:block w-56 shrink-0 border-r border-neutral-200/60 dark:border-neutral-800/60 pr-4">
					<nav className="space-y-1 text-sm">
						<AdminNavLink to="/admin" end>대시보드</AdminNavLink>
						<AdminNavLink to="/admin/weddings">결혼식 목록</AdminNavLink>
						<AdminNavLink to="/admin/weddings/new">결혼식 생성</AdminNavLink>
						<AdminNavLink to="/admin/invitations/new">초대장 생성</AdminNavLink>
					</nav>
				</aside>
				<main className="flex-1 min-w-0">
					{useRoutes(routes)}
				</main>
			</div>
		</div>
	)
}


