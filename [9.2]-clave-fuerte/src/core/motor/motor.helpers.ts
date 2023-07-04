import { ValidacionClave } from "../model";

export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
	const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).+$");

	return {
		esValida: regex.test(clave),
		error: regex.test(clave)
			? ""
			: "La clave debe tener al menos una mayúscula y una minúscula.",
	};
};

export const tieneNumeros = (clave: string): ValidacionClave => {
	const regex = new RegExp("^(?=.*[0-9]).+$");

	return {
		esValida: regex.test(clave),
		error: regex.test(clave) ? "" : "La clave debe tener al menos un número.",
	};
};
