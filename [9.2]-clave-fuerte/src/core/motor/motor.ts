import { ValidacionClave } from "../model";
import {
	errorMessageMustHaveEightCharacters,
	errorMessageMustHaveOneNumber,
	errorMessageMustHaveOneSpecialCharacter,
	errorMessageMustHaveOneUpperCaseAndOneLowerCase,
	errorMessageMustNotBeCommonPassword,
	errorMessageMustNotHaveUserName,
	errorMessageUserNameAndPasswordAreRequired,
	successMessage,
} from "../constants";
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
				message: errorMessageUserNameAndPasswordAreRequired,
			};
		case tieneMayusculasYMinusculas(clave):
			return {
				esValida: false,
				message: errorMessageMustHaveOneUpperCaseAndOneLowerCase,
			};
		case tieneNumeros(clave):
			return {
				esValida: false,
				message: errorMessageMustHaveOneNumber,
			};
		case tieneCaracteresEspeciales(clave):
			return {
				esValida: false,
				message: errorMessageMustHaveOneSpecialCharacter,
			};
		case tieneLongitudMinima(clave):
			return {
				esValida: false,
				message: errorMessageMustHaveEightCharacters,
			};
		case tieneNombreUsuario(nombreUsuario, clave):
			return {
				esValida: false,
				message: errorMessageMustNotHaveUserName,
			};
		case tienePalabrasComunes(clave, commonPasswords):
			return {
				esValida: false,
				message: errorMessageMustNotBeCommonPassword,
			};
		default:
			return {
				esValida: true,
				message: successMessage,
			};
	}
};
