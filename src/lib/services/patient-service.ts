import { ApiError, apiJson, apiRequest, apiUrl } from './api-client';
import type { MedicalFile, Patient } from './models';

function withAbsoluteFileUrl(file: MedicalFile): MedicalFile {
	return { ...file, url: apiUrl(file.url) };
}

export const PatientService = {
	async getAll(): Promise<Patient[]> {
		return apiJson<Patient[]>('/patients');
	},

	async getById(id: string): Promise<Patient | undefined> {
		try {
			return await apiJson<Patient>(`/patients/${encodeURIComponent(id)}`);
		} catch (error) {
			if (error instanceof ApiError && error.status === 404) return undefined;
			throw error;
		}
	},

	async update(id: string, changes: Partial<Patient>): Promise<Patient | undefined> {
		try {
			return await apiJson<Patient>(`/patients/${encodeURIComponent(id)}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(changes)
			});
		} catch (error) {
			if (error instanceof ApiError && error.status === 404) return undefined;
			throw error;
		}
	},

	async getFiles(patientId: string): Promise<MedicalFile[]> {
		const files = await apiJson<MedicalFile[]>(`/patients/${encodeURIComponent(patientId)}/files`);
		return files.map(withAbsoluteFileUrl);
	},

	async getQr(patientId: string): Promise<string> {
		const response = await apiRequest(`/patients/${encodeURIComponent(patientId)}/qr`);
		return URL.createObjectURL(await response.blob());
	},

	async addFile(patientId: string, file: File): Promise<MedicalFile[]> {
		const body = new FormData();
		body.append('file', file);
		await apiJson<MedicalFile>(`/patients/${encodeURIComponent(patientId)}/files`, {
			method: 'POST',
			body
		});
		return this.getFiles(patientId);
	},

	async removeFile(patientId: string, fileId: string): Promise<MedicalFile[]> {
		await apiJson<void>(`/patients/${encodeURIComponent(patientId)}/files/${encodeURIComponent(fileId)}`, {
			method: 'DELETE'
		});
		return this.getFiles(patientId);
	}
};