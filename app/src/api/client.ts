export interface ApiEnvelope<T> {
	success: boolean
	data: T | null
	error: { code: string; message: string } | null
}

export interface ApiResult<T> {
	data: T | null
	error: string | null
	requestId?: string
}

export async function api<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
	const base = import.meta.env.VITE_API_BASE_URL
	const res = await fetch(`${base}${path}`, {
		...init,
		headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
	})
	const requestId = res.headers.get('X-Request-Id') || undefined
	const body = (await res.json()) as ApiEnvelope<T>
	if (!body.success) return { data: null, error: body.error?.message || 'Unknown error', requestId }
	return { data: body.data as T, error: null, requestId }
}


