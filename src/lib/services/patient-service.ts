import { patients } from './mock-data';
import { mockDelay } from './mock-delay';
import type { MedicalFile, Patient } from './models';

const records = structuredClone(patients);
const filesByPatient = new Map<string, MedicalFile[]>();

export const PatientService = {
	async getAll(): Promise<Patient[]> {
		return mockDelay(records);
	},

	async getById(id: string): Promise<Patient | undefined> {
		return mockDelay(records.find((patient) => patient.id.toLowerCase() === id.toLowerCase()));
	},

	async update(id: string, changes: Partial<Patient>): Promise<Patient | undefined> {
		const patient = records.find((record) => record.id === id);
		if (!patient) return mockDelay(undefined);
		Object.assign(patient, changes);
		return mockDelay(patient);
	},

	async getFiles(patientId: string): Promise<MedicalFile[]> {
		return mockDelay(filesByPatient.get(patientId) ?? []);
	},

	async addFile(patientId: string, file: MedicalFile): Promise<MedicalFile[]> {
		const files = filesByPatient.get(patientId) ?? [];
		files.unshift(file);
		filesByPatient.set(patientId, files);
		return mockDelay(files);
	},

	async removeFile(patientId: string, fileId: string): Promise<MedicalFile[]> {
		const files = (filesByPatient.get(patientId) ?? []).filter((file) => file.id !== fileId);
		filesByPatient.set(patientId, files);
		return mockDelay(files);
	}
};