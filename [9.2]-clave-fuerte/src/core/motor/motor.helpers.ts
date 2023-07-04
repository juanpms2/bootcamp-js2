import { ValidacionClave } from "../model";

export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
	const regex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

	return {
		esValida: regex.test(clave),
		error: regex.test(clave)
			? ""
			: "La clave debe tener al menos una mayúscula y una minúscula.",
	};
};

export const tieneNumeros = (clave: string): ValidacionClave => {
	const regex = /[0-9]/;

	return {
		esValida: regex.test(clave),
		error: regex.test(clave) ? "" : "La clave debe tener al menos un número.",
	};
};

export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
	const regex = /[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?`~]/;

	return {
		esValida: regex.test(clave),
		error: regex.test(clave)
			? ""
			: "La clave debe tener al menos un caracter especial.",
	};
};

export const tieneLongitudMinima = (clave: string): ValidacionClave => {
	return {
		esValida: clave.length >= 8,
		error:
			clave.length >= 8 ? "" : "La clave debe tener al menos 8 caracteres.",
	};
};
