const elementInDOM = (id: string) => document.getElementById(id);

export const elementReady = (id: string) => {
	const element = elementInDOM(id);
	if (element && element instanceof HTMLElement) {
		return element;
	}
	console.log(new Error(`Element with id ${id} not found in DOM`));
	return null;
};
