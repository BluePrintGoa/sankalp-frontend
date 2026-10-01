import { apiJson } from './api-client';
import type { AuthUser, Role } from './models';

export const AuthService = {
	async getCurrentUser(): Promise<AuthUser> {
		return apiJson<AuthUser>('/auth/me');
	},

	async getRole(): Promise<Role> {
		return (await this.getCurrentUser()).role;
	},

	async login(credentials: { email: string; password: string }): Promise<AuthUser> {
		const response = await apiJson<{ user: AuthUser }>('/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials)
		});
		return response.user;
	},

	async logout(): Promise<void> {
		await apiJson<void>('/auth/logout', { method: 'POST' });
	}
};