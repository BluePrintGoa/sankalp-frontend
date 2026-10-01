import { apiJson } from './api-client';
import type { Doctor } from './models';

export const DoctorService = {
	async getProfile(): Promise<Doctor> {
		return apiJson<Doctor>('/doctors/me');
	},

	async updateProfile(changes: Partial<Doctor>): Promise<Doctor> {
		return apiJson<Doctor>('/doctors/me', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(changes)
		});
	}
};