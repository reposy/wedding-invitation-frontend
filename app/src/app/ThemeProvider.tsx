import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'

type ThemeId = 'romantic' | 'elderly'

export function ThemeProvider({ children, theme }: PropsWithChildren<{ theme?: ThemeId }>) {
	useEffect(() => {
		const id: ThemeId = theme || 'romantic'
		document.documentElement.setAttribute('data-theme', id)
		return () => {
			document.documentElement.removeAttribute('data-theme')
		}
	}, [theme])

	return children as any
}


