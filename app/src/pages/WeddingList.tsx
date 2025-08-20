import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listWeddings } from '../api/weddings'
import type { Wedding } from '../types/api'
import { useToast } from '../app/ToastProvider'

export function WeddingList() {
	const [items, setItems] = useState<Wedding[] | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const { show } = useToast()

	useEffect(() => {
		let mounted = true
		;(async () => {
			setLoading(true)
			const { data, error, requestId } = await listWeddings(0, 20)
			if (!mounted) return
			if (error) {
				setError(error)
				show(`목록을 불러오지 못했습니다: ${error} (req: ${requestId || '-'})`, { type: 'error' })
			} else {
				setItems(data?.items ?? [])
			}
			setLoading(false)
		})()
		return () => {
			mounted = false
		}
	}, [show])

	return (
		<div className="p-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">결혼식 목록</h2>
				<Link to="/admin/weddings/new" className="text-sm underline">새 결혼식</Link>
			</div>
			{loading ? (
				<p className="mt-4 text-sm opacity-80">로딩 중…</p>
			) : error ? (
				<p className="mt-4 text-sm text-red-600">불러오기 실패: {error}</p>
			) : (items && items.length > 0) ? (
				<div className="mt-4 divide-y divide-neutral-200/60 dark:divide-neutral-800/60 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900">
					{items.map(w => (
						<div key={w.id} className="flex items-center justify-between p-4">
							<div>
								<div className="font-medium">{w.title}</div>
								<div className="text-xs opacity-70">코드: {w.code}</div>
							</div>
							<Link to={`/admin/weddings/${w.id}`} className="text-sm underline">상세</Link>
						</div>
					))}
				</div>
			) : (
				<div className="mt-6 text-sm opacity-80">
					아직 생성된 결혼식이 없습니다. {' '}
					<Link to="/admin/weddings/new" className="underline">결혼식 생성</Link>
				</div>
			)}
		</div>
	)
}


