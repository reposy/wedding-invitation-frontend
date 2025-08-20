import type { SelectHTMLAttributes } from 'react'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export function Select(props: Props) {
	return (
		<select
			{...props}
			className={`w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/90 px-3 py-2 text-sm outline-none focus-visible:ring-2 ring-pink-400 ${props.className || ''}`}
		/>
	)
}


