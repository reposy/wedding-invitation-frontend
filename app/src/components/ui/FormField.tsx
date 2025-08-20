import { ReactNode } from 'react'

type Props = {
	id: string
	label: string
	children: ReactNode
	error?: string
}

export function FormField({ id, label, children, error }: Props) {
	return (
		<div className="mb-4">
			<label htmlFor={id} className="block text-sm font-medium mb-1">
				{label}
			</label>
			{children}
			{error ? (
				<p role="alert" className="mt-1 text-sm text-red-600" aria-live="polite">{error}</p>
			) : null}
		</div>
	)
}


