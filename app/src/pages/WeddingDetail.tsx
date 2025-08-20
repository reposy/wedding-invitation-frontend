import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getWeddingById } from '../api/weddings'
import type { Wedding } from '../types/api'
import { useForm } from 'react-hook-form'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { createInvitation } from '../api/invitations'
import { useToast } from '../app/ToastProvider'

type CreateInvitationForm = { invitationCode: string }

export function WeddingDetail() {
	const { id } = useParams()
	const weddingId = Number(id)
	const [wedding, setWedding] = useState<Wedding | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { register, handleSubmit, formState, reset } = useForm<CreateInvitationForm>({ defaultValues: { invitationCode: '' } })
	const { show } = useToast()

	useEffect(() => {
		let mounted = true
		;(async () => {
			setLoading(true)
			const { data, error, requestId } = await getWeddingById(weddingId)
			if (!mounted) return
			if (error) {
				setError(error)
				show(`상세를 불러오지 못했습니다: ${error} (req: ${requestId || '-'})`, { type: 'error' })
			} else {
				setWedding(data!)
			}
			setLoading(false)
		})()
		return () => { mounted = false }
	}, [weddingId, show])

	const onCreateInvitation = async (values: CreateInvitationForm) => {
		try {
			const { data, error, requestId } = await createInvitation({ weddingId, invitationCode: values.invitationCode })
			if (error) return show(`초대장 생성 실패: ${error} (req: ${requestId || '-'})`, { type: 'error' })
			show(`초대장 생성 성공: code=${data?.invitationCode}`)
			reset({ invitationCode: '' })
		} catch (e: any) {
			show(`요청 실패: ${e?.message || e}`, { type: 'error' })
		}
	}

	return (
		<div className="p-6">
			{loading ? (
				<p className="text-sm opacity-80">로딩 중…</p>
			) : error ? (
				<p className="text-sm text-red-600">불러오기 실패: {error}</p>
			) : wedding ? (
				<div className="space-y-6">
					<section>
						<h2 className="text-xl font-semibold">결혼식 상세</h2>
						<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 p-4">
								<div className="text-sm opacity-70">제목</div>
								<div className="font-medium">{wedding.title}</div>
							</div>
							<div className="rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 p-4">
								<div className="text-sm opacity-70">코드</div>
								<div className="font-medium">{wedding.code}</div>
							</div>
						</div>
					</section>
					<section className="rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 p-4">
						<h3 className="font-medium">초대장 생성</h3>
						<p className="mt-1 text-sm opacity-80">초대장 코드를 입력하고 생성하세요.</p>
						<form className="mt-3 flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit(onCreateInvitation)}>
							<Input placeholder="예: WDG-2025-JJ" {...register('invitationCode', { required: true })} />
							<Button type="submit" loading={formState.isSubmitting}>초대장 생성</Button>
						</form>
					</section>
				</div>
			) : null}
		</div>
	)
}


