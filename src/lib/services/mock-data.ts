import type { Appointment, Doctor, Patient } from './models';

export const patients: Patient[] = [
	{
		id: 'PT-2048',
		name: 'Amelia Hart',
		dateOfBirth: '1989-04-16',
		sex: 'Female',
		bloodGroup: 'A+',
		heightCm: 168,
		weightKg: 63.4,
		phone: '+1 (415) 555-0148',
		email: 'amelia.hart@example.com',
		conditions: ['Mild asthma', 'Seasonal allergic rhinitis'],
		allergies: ['Penicillin', 'Tree nuts'],
		medications: ['Albuterol inhaler · 90 mcg as needed', 'Cetirizine · 10 mg daily'],
		lastVisit: '2026-09-18'
	},
	{
		id: 'PT-1932',
		name: 'Noah Williams',
		dateOfBirth: '1976-11-02',
		sex: 'Male',
		bloodGroup: 'O−',
		heightCm: 181,
		weightKg: 82.1,
		phone: '+1 (415) 555-0193',
		email: 'noah.williams@example.com',
		conditions: ['Hypertension'],
		allergies: ['Sulfa drugs'],
		medications: ['Lisinopril · 10 mg daily'],
		lastVisit: '2026-09-22'
	},
	{
		id: 'PT-1756',
		name: 'Sofia Chen',
		dateOfBirth: '1995-07-27',
		sex: 'Female',
		bloodGroup: 'B+',
		heightCm: 163,
		weightKg: 57.8,
		phone: '+1 (415) 555-0175',
		email: 'sofia.chen@example.com',
		conditions: ['Migraine'],
		allergies: [],
		medications: ['Sumatriptan · 50 mg as needed'],
		lastVisit: '2026-09-24'
	},
	{
		id: 'PT-1684',
		name: 'Ethan Brooks',
		dateOfBirth: '1964-02-10',
		sex: 'Male',
		bloodGroup: 'AB+',
		heightCm: 175,
		weightKg: 76.2,
		phone: '+1 (415) 555-0168',
		email: 'ethan.brooks@example.com',
		conditions: ['Type 2 diabetes'],
		allergies: ['Latex'],
		medications: ['Metformin · 500 mg twice daily'],
		lastVisit: '2026-09-26'
	}
];

export const doctor: Doctor = {
	id: 'DR-0081',
	name: 'Dr. Maya Patel',
	specialty: 'Internal medicine',
	license: 'CA · A129844',
	phone: '+1 (415) 555-0081',
	email: 'maya.patel@northstar.health',
	clinic: 'Northstar Medical · Suite 240',
	workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
	startTime: '08:30',
	endTime: '17:00'
};

export const appointments: Appointment[] = [
	{ id: 'AP-4101', patientId: 'PT-2048', patientName: 'Amelia Hart', time: '09:00', durationMinutes: 30, type: 'Follow-up', status: 'Checked in' },
	{ id: 'AP-4102', patientId: 'PT-1932', patientName: 'Noah Williams', time: '09:45', durationMinutes: 30, type: 'Blood pressure review', status: 'Scheduled' },
	{ id: 'AP-4103', patientId: 'PT-1756', patientName: 'Sofia Chen', time: '10:30', durationMinutes: 45, type: 'New patient', status: 'Scheduled' },
	{ id: 'AP-4104', patientId: 'PT-1684', patientName: 'Ethan Brooks', time: '11:30', durationMinutes: 30, type: 'Diabetes check-in', status: 'Scheduled' },
	{ id: 'AP-4105', patientId: 'PT-1932', patientName: 'Noah Williams', time: '13:30', durationMinutes: 30, type: 'Lab results', status: 'Scheduled' }
];