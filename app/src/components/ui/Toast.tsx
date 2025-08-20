import { useEffect, useState } from 'react'

type ToastProps = { message: string; type?: 'success' | 'error'; durationMs?: number }

export function Toast({ message, type = 'success', durationMs = 2500 }: ToastProps) {
	const [visible, setVisible] = useState(true)
	useEffect(() => {
		const t = setTimeout(() => setVisible(false), durationMs)
		return () => clearTimeout(t)
	}, [durationMs])
	if (!visible) return null
	return (
		<div
			role="status"
			aria-live="polite"
			className={`fixed bottom-4 inset-x-0 mx-auto w-fit px-4 py-2 rounded-md text-sm shadow-md ${
				type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
			}`}
		>
			{message}
		</div>
	)
}


