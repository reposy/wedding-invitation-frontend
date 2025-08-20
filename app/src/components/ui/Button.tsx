import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }

export function Button({ loading, children, ...rest }: Props) {
	return (
		<button
			{...rest}
			disabled={loading || rest.disabled}
			className={`inline-flex items-center justify-center rounded-md bg-pink-600 text-white px-4 py-2 text-sm font-medium hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed ${rest.className || ''}`}
		>
			{loading ? <span className="mr-2 h-4 w-4 animate-spin border-2 border-white/60 border-t-transparent rounded-full" /> : null}
			{children}
		</button>
	)
}


