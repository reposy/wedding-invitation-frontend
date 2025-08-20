import { api } from './client'
import type { PageResponse, Wedding } from '../types/api'

export async function listWeddings(page = 0, size = 20) {
	return api<PageResponse<Wedding>>(`/api/v1/weddings?page=${page}&size=${size}`)
}

export async function createWedding(input: { code: string; title: string }) {
	return api<Wedding>(`/api/v1/weddings`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input),
	})
}

export async function getWeddingById(id: number) {
	return api<Wedding>(`/api/v1/weddings/${id}`)
}


