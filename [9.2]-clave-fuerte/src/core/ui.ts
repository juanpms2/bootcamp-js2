import { elementReady } from "./helpers";
import { validarClave } from "./motor/motor";

const titleElement = elementReady("title");
const formElement = elementReady("form");
const inputNameElement = elementReady("user-name") as HTMLInputElement;
const inputPasswordElement = elementReady("password") as HTMLInputElement;
const errorMessageElement = elementReady("error-message");

export const loadApp = () => {
	titleElement.innerHTML = "Clave fuerte";
	formElement.addEventListener("submit", (event) => {
		event.preventDefault();
		const name = inputNameElement.value;
		const password = inputPasswordElement.value;
		const result = validarClave(name, password, []);
		errorMessageElement.classList.add("display");
		errorMessageElement.innerHTML = result.error;
	});
};
