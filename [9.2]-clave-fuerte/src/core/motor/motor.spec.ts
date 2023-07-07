import { validarClave } from "./motor";
import {
	errorMessageUserNameAndPasswordAreRequired,
	errorMessageMustHaveEightCharacters,
	errorMessageMustHaveOneUpperCaseAndOneLowerCase,
	errorMessageMustHaveOneNumber,
	errorMessageMustHaveOneSpecialCharacter,
	errorMessageMustNotHaveUserName,
	errorMessageMustNotBeCommonPassword,
	successMessage,
} from "../constants";

describe("validarClave specs", () => {
	it.each([
		[
			undefined,
			{ esValida: false, message: errorMessageUserNameAndPasswordAreRequired },
		],
		[
			null,
			{ esValida: false, message: errorMessageUserNameAndPasswordAreRequired },
		],
		[
			"",
			{ esValida: false, message: errorMessageUserNameAndPasswordAreRequired },
		],
	])(`Should return %s when clave is %s`, (clave, expected) => {
		//Arrange
		//Act
		const result = validarClave(clave, "nombreUsuario", []);

		//Assert
		expect(result).toEqual(expected);
	});
	it.each([
		[
			undefined,
			{ esValida: false, message: errorMessageUserNameAndPasswordAreRequired },
		],
		[
			null,
			{ esValida: false, message: errorMessageUserNameAndPasswordAreRequired },
		],
		[
			"",
			{ esValida: false, message: errorMessageUserNameAndPasswordAreRequired },
		],
	])(`Should return %s when nombreUsuario is %s`, (nombreUsuario, expected) => {
		//Arrange
		//Act
		const result = validarClave(nombreUsuario, "Clave", []);

		//Assert
		expect(result).toEqual(expected);
	});

	it("Should return esValida: false and message: errorMessageMustHaveOneUpperCaseAndOneLowerCase when clave does not have one upper case and one lower case", () => {
		//Arrange
		const clave = "test";

		//Act
		const result = validarClave("nombreUsuario", clave, []);

		//Assert
		expect(result).toEqual({
			esValida: false,
			message: errorMessageMustHaveOneUpperCaseAndOneLowerCase,
		});
	});

	it("Should return esValida: false and message: errorMessageMustHaveOneNumber when clave does not have one number", () => {
		//Arrange
		const clave = "Test";

		//Act
		const result = validarClave("nombreUsuario", clave, []);

		//Assert
		expect(result).toEqual({
			esValida: false,
			message: errorMessageMustHaveOneNumber,
		});
	});

	it("Should return esValida: false and message: errorMessageMustHaveOneSpecialCharacter when clave does not have one special character", () => {
		//Arrange
		const clave = "Clave1";

		//Act
		const result = validarClave("nombreUsuario", clave, []);

		//Assert
		expect(result).toEqual({
			esValida: false,
			message: errorMessageMustHaveOneSpecialCharacter,
		});
	});

	it("Should return esValida: false and message: errorMessageMustHaveEightCharacters when clave does not have eight characters", () => {
		//Arrange
		const clave = "Test1@";

		//Act
		const result = validarClave("nombreUsuario", clave, []);

		//Assert
		expect(result).toEqual({
			esValida: false,
			message: errorMessageMustHaveEightCharacters,
		});
	});

	it("Should return esValida: false and message: errorMessageMustNotHaveUserName when clave has the username", () => {
		//Arrange
		const clave = "userName1@";
		const userName = "userName";

		//Act
		const result = validarClave(userName, clave, []);

		//Assert
		expect(result).toEqual({
			esValida: false,
			message: errorMessageMustNotHaveUserName,
		});
	});

	it("Should return esValida: false and message: errorMessageMustNotBeCommonPassword when clave is a common password", () => {
		//Arrange
		const clave = "P@5sword";
		const commonPasswords = ["P@5sword"];

		//Act
		const result = validarClave("nombreUsuario", clave, commonPasswords);

		//Assert
		expect(result).toEqual({
			esValida: false,
			message: errorMessageMustNotBeCommonPassword,
		});
	});
});
