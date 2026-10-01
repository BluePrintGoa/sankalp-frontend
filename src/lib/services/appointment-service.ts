import { apiJson } from './api-client';
import type { Appointment } from './models';

export const AppointmentService = {
	async getDaily(): Promise<Appointment[]> {
		return apiJson<Appointment[]>('/appointments/daily');
	},

	async getMine(): Promise<Appointment[]> {
		return apiJson<Appointment[]>('/appointments/mine');
	},

	async update(id: string, changes: Partial<Appointment>): Promise<Appointment | undefined> {
		return apiJson<Appointment>(`/appointments/${encodeURIComponent(id)}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(changes)
		});
	}
};