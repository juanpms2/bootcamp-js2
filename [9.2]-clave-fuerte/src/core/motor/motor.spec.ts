import { validarClave } from "./motor";
import { errorMessageUserNameAndPasswordAreRequired } from "../constants";

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
});
