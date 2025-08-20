export type PageResponse<T> = {
	items: T[]
	page: number
	size: number
	totalPages: number
	totalElements: number
	hasNext: boolean
}

export type Wedding = {
	id: number
	code: string
	title: string
	createdAt: string
	updatedAt: string
}

export type Invitation = {
	id: number
	weddingId: number
	invititationId?: never
	invitationCode: string
	status: 'DRAFT' | 'PUBLISHED'
	publishedAt: string | null
	createdAt: string
	updatedAt: string
}


