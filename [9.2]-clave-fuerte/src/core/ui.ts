import { elementReady } from "./helpers";
import { validarClave } from "./motor/motor";
import { commonPasswords } from "./mock-data";

const formElement = elementReady("form");
const inputNameElement = elementReady("user-name") as HTMLInputElement;
const inputPasswordElement = elementReady("password") as HTMLInputElement;
const messageElement = elementReady("error-message");

const onValidarClave = (name: string, password: string) => {
	const result = validarClave(name, password, commonPasswords);

	if (result.esValida) {
		messageElement.classList.remove("error");
		messageElement.classList.add("success");
	} else {
		messageElement.classList.remove("success");
		messageElement.classList.add("error");
	}
	messageElement.innerHTML = result.message;
};

export const loadApp = () => {
	inputNameElement.value = "";
	inputPasswordElement.value = "";

	formElement.addEventListener("submit", (event) => {
		event.preventDefault();
		onValidarClave(inputNameElement.value, inputPasswordElement.value);
	});
	inputNameElement.addEventListener("change", () =>
		onValidarClave(inputNameElement.value, inputPasswordElement.value)
	);

	inputPasswordElement.addEventListener("input", () =>
		onValidarClave(inputNameElement.value, inputPasswordElement.value)
	);
};
