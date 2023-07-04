import { ValidacionClave } from "../model";

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
