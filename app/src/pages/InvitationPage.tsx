import { useParams } from 'react-router-dom'

export function InvitationPage() {
	const { invitationCode } = useParams()
	return (
		<div className="min-h-screen flex items-center justify-center p-6">
			<div className="p-6 rounded-xl shadow-sm border border-neutral-200/60 dark:border-neutral-800/60">
				<h1 className="text-2xl font-semibold">Invitation</h1>
				<p className="mt-2 text-sm opacity-80">코드: {invitationCode}</p>
			</div>
		</div>
	)
}


