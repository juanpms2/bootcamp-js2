import { ValidacionClave } from "../model";

export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
	//TODO
	return {
		esValida: false,
		error: `${clave} es una clave muy común.`,
	};
};

export const tieneNumeros = (clave: string): ValidacionClave => {
	//TODO
	return {
		esValida: false,
		error: `${clave} es una clave muy común.`,
	};
};

export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
	//TODO
	return {
		esValida: false,
		error: `${clave} es una clave muy común.`,
	};
};

export const tieneLongitudMinima = (clave: string): ValidacionClave => {
	//TODO
	return {
		esValida: false,
		error: `${clave} es una clave muy común.`,
	};
};

export const tieneNombreUsuario = (
	nombreUsuario: string,
	clave: string
): ValidacionClave => {
	//TODO
	return {
		esValida: false,
		error: `${nombreUsuario} no es una clave válida, ${clave} es una clave muy común.`,
	};
};

export const tienePalabrasComunes = (
	clave: string,
	commonPasswords: string[]
): ValidacionClave => {
	//TODO
	return {
		esValida: false,
		error: `${clave} es una clave muy común., ${commonPasswords}`,
	};
};

export const validarClave = (
	nombreUsuario: string,
	clave: string,
	commonPasswords: string[]
): ValidacionClave => {
	//TODO
	return {
		esValida: false,
		error: `${nombreUsuario} no es una clave válida, ${clave} es una clave muy común., ${commonPasswords}`,
	};
};
