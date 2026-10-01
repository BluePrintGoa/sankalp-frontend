import { env } from '$env/dynamic/public';

const apiBaseUrl = (env.PUBLIC_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');
let refreshRequest: Promise<boolean> | undefined;

export class ApiError extends Error {
	constructor(message: string, readonly status: number) {
		super(message);
		this.name = 'ApiError';
	}
}

export function apiUrl(path: string): string {
	return new URL(path.replace(/^\/+/, ''), `${apiBaseUrl}/`).toString();
}

function csrfToken(): string | undefined {
	if (typeof document === 'undefined') return undefined;
	const entry = document.cookie.split('; ').find((cookie) => cookie.startsWith('csrf_token='));
	return entry ? decodeURIComponent(entry.slice('csrf_token='.length)) : undefined;
}

async function refreshSession(): Promise<boolean> {
	const token = csrfToken();
	if (!token) return false;
	const response = await fetch(apiUrl('/auth/refresh'), {
		method: 'POST',
		credentials: 'include',
		headers: { 'X-CSRF-Token': token }
	});
	return response.ok;
}

export async function apiRequest(path: string, init: RequestInit = {}): Promise<Response> {
	const headers = new Headers(init.headers);
	const method = (init.method ?? 'GET').toUpperCase();
	if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
		const token = csrfToken();
		if (token) headers.set('X-CSRF-Token', token);
	}
	const options: RequestInit = { ...init, headers, credentials: 'include' };
	let response = await fetch(apiUrl(path), options);
	if (response.status === 401 && !['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'].includes(path)) {
		refreshRequest ??= refreshSession().finally(() => { refreshRequest = undefined; });
		if (await refreshRequest) response = await fetch(apiUrl(path), options);
	}
	if (!response.ok) {
		let message = `Request failed (${response.status})`;
		try {
			const body = await response.json();
			message = typeof body.detail === 'string' ? body.detail : message;
		} catch {
			// Keep the HTTP status as the useful fallback for non-JSON errors.
		}
		throw new ApiError(message, response.status);
	}
	return response;
}

export async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await apiRequest(path, init);
	if (response.status === 204) return undefined as T;
	return response.json() as Promise<T>;
}
