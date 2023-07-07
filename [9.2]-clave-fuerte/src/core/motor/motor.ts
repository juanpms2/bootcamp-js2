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
	if (!clave || !nombreUsuario) {
		return {
			esValida: false,
			message: errorMessageUserNameAndPasswordAreRequired,
		};
	}

	if (!tieneMayusculasYMinusculas(clave)) {
		return {
			esValida: false,
			message: errorMessageMustHaveOneUpperCaseAndOneLowerCase,
		};
	}

	if (!tieneNumeros(clave)) {
		return {
			esValida: false,
			message: errorMessageMustHaveOneNumber,
		};
	}

	if (!tieneCaracteresEspeciales(clave)) {
		return {
			esValida: false,
			message: errorMessageMustHaveOneSpecialCharacter,
		};
	}

	if (!tieneLongitudMinima(clave)) {
		return {
			esValida: false,
			message: errorMessageMustHaveEightCharacters,
		};
	}

	if (tieneNombreUsuario(nombreUsuario, clave)) {
		return {
			esValida: false,
			message: errorMessageMustNotHaveUserName,
		};
	}

	if (tienePalabrasComunes(clave, commonPasswords)) {
		return {
			esValida: false,
			message: errorMessageMustNotBeCommonPassword,
		};
	}

	return {
		esValida: true,
		message: successMessage,
	};
};
