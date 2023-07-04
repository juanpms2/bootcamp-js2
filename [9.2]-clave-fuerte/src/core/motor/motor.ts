import { ValidacionClave } from "../model";
import {
	tieneMayusculasYMinusculas,
	tieneNumeros,
	tieneCaracteresEspeciales,
	tieneLongitudMinima,
	tieneNombreUsuario,
	tienePalabrasComunes,
} from "./motor.helpers";

export const validarClave = (
	nombreUsuario: string,
	clave: string,
	commonPasswords: string[]
): ValidacionClave => {
	switch (false) {
		case !!clave && !!nombreUsuario:
			return {
				esValida: false,
				error: "El usuario y la clave son obligatorios",
			};
		case tieneMayusculasYMinusculas(clave):
			return {
				esValida: false,
				error: "La clave debe tener al menos una mayúscula y una minúscula.",
			};
		case tieneNumeros(clave):
			return {
				esValida: false,
				error: "La clave debe tener al menos un número",
			};
		case tieneCaracteresEspeciales(clave):
			return {
				esValida: false,
				error: "La clave debe contener al menos un caracter especial",
			};
		case tieneLongitudMinima(clave):
			return {
				esValida: false,
				error: "La clave debe tener una longitud mínima de 8 caracteres",
			};
		case tieneNombreUsuario(nombreUsuario, clave):
			return {
				esValida: false,
				error: "La clave no puede contener el nombre de usuario",
			};
		case tienePalabrasComunes(clave, commonPasswords):
			return {
				esValida: false,
				error: "La clave es demasiado común",
			};
		default:
			return {
				esValida: true,
				error: "Enhorabuena, la clave es segura",
			};
	}
};
