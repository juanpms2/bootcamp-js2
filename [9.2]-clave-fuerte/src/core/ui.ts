import { elementReady } from "./helpers";

const titleElement = elementReady("title");

export const loadApp = () => {
	titleElement.innerHTML = "Clave fuerte";
};
