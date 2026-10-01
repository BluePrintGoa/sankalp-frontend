import { appointments } from './mock-data';
import { mockDelay } from './mock-delay';
import type { Appointment } from './models';

const schedule = structuredClone(appointments);

export const AppointmentService = {
	async getDaily(): Promise<Appointment[]> {
		return mockDelay([...schedule].sort((a, b) => a.time.localeCompare(b.time)));
	},

	async update(id: string, changes: Partial<Appointment>): Promise<Appointment | undefined> {
		const appointment = schedule.find((item) => item.id === id);
		if (!appointment) return mockDelay(undefined);
		Object.assign(appointment, changes);
		return mockDelay(appointment);
	}
};