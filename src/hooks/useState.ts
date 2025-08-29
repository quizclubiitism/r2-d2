import { useState as _useState } from "react";

export interface StructuredState<T> {
	value: T;
	setValue: (newValue: T | ((prevValue: T) => T)) => void;
}

/**
 * Hook that returns state in object format instead of array.
 * Provides the same functionality as useState but with structured return.
 *
 * @param initialState Initial state value
 * @returns Object containing value and setValue function
 */
export function useState<T>(initialState: T): StructuredState<T> {
	const [value, setValue] = _useState<T>(initialState);
	return { value, setValue };
}
