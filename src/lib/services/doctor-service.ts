import { doctor } from './mock-data';
import { mockDelay } from './mock-delay';
import type { Doctor } from './models';

const profile = structuredClone(doctor);

export const DoctorService = {
	async getProfile(): Promise<Doctor> {
		return mockDelay(profile);
	},

	async updateProfile(changes: Partial<Doctor>): Promise<Doctor> {
		Object.assign(profile, changes);
		return mockDelay(profile);
	}
};