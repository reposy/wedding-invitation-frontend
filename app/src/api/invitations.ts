import { api } from './client'
import type { Invitation } from '../types/api'

export async function createInvitation(input: { weddingId: number; invitationCode: string }) {
	return api<Invitation>(`/api/v1/invitations`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(input),
	})
}


