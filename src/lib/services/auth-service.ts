import { mockDelay } from './mock-delay';
import type { Role } from './models';

let activeRole: Role = 'doctor';

export const AuthService = {
	async getRole(): Promise<Role> {
		return mockDelay(activeRole, 100);
	},

	async setRole(role: Role): Promise<Role> {
		activeRole = role;
		return mockDelay(activeRole, 100);
	}
};