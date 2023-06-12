const elementInDOM = (id: string) => document.getElementById(id);

export const elementReady = (id: string) => {
	const element = elementInDOM(id);
	if (element && element instanceof HTMLElement) {
		return element;
	}
	console.log(new Error(`Element with id ${id} not found in DOM`));
	return null;
};

type SetState<T> = (newState: Partial<T>) => T;
type GetState<T> = () => T;

export const gameStateManagement = <T>(
	initialState: T
): [GetState<T>, SetState<T>] => {
	let state: T = initialState;

	const getState = (): T => state;

	const setState = (newState: Partial<T>): T =>
		(state = { ...state, ...newState });

	return [getState, setState];
};
