export function mockDelay<T>(value: T, milliseconds = 260): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(structuredClone(value)), milliseconds);
	});
}