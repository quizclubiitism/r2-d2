import { useCallback } from "react";
import type { StructuredState } from "./useState";

/**
 * Selector function type for deriving state.
 */
export type StateSelector<TParent, TChild> = (parent: TParent) => TChild;

/**
 * Updater function type for deriving state.
 * Takes the parent state and the new child state, and returns the updated parent state.
 */
export type StateUpdater<TParent, TChild> = (
	parent: TParent,
	child: TChild
) => TParent;

/**
 * Hook for creating derived state from parent state.
 * Child state changes automatically update the parent state.
 *
 * @param parentState Parent state object from useState
 * @param selector Function to extract child value from the parent
 * @param updater Function to update the parent when the child changes
 * @returns Child state object that syncs with parent
 */
export function useDerivedState<TParent, TChild>(
	parentState: StructuredState<TParent>,
	selector: StateSelector<TParent, TChild>,
	updater: StateUpdater<TParent, TChild>
): StructuredState<TChild> {
	const childValue = selector(parentState.value);

	const setChildValue = useCallback(
		(newChildValue: TChild | ((prevChildValue: TChild) => TChild)) => {
			const actualNewValue =
				typeof newChildValue === "function"
					? (newChildValue as (prev: TChild) => TChild)(childValue)
					: newChildValue;

			const newParentValue = updater(parentState.value, actualNewValue);
			parentState.setValue(newParentValue);
		},
		[parentState, childValue, updater]
	);

	return {
		value: childValue,
		setValue: setChildValue,
	};
}
