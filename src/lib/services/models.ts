export type Role = 'doctor' | 'patient';

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	sex: string;
	bloodGroup: string;
	heightCm: number;
	weightKg: number;
	phone: string;
	email: string;
	conditions: string[];
	allergies: string[];
	medications: string[];
	lastVisit: string | null;
}

export interface Doctor {
	id: string;
	name: string;
	specialty: string;
	license: string;
	phone: string;
	email: string;
	clinic: string;
	workingDays: string[];
	startTime: string;
	endTime: string;
}

export interface Appointment {
	id: string;
	patientId: string;
	patientName: string;
	date: string;
	time: string;
	durationMinutes: number;
	type: string;
	status: 'Scheduled' | 'Checked in' | 'Completed';
}

export interface MedicalFile {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
	addedAt: string;
}

export interface AuthUser {
	id: string;
	email: string;
	role: Role;
	patient: Patient | null;
	doctor: Doctor | null;
}