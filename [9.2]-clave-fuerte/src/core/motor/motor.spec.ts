import { validarClave } from "./motor";

describe("validarClave specs", () => {
	it.each([
		[
			undefined,
			{ esValida: false, error: "El usuario y la clave son obligatorios" },
		],
		[
			null,
			{ esValida: false, error: "El usuario y la clave son obligatorios" },
		],
		["", { esValida: false, error: "El usuario y la clave son obligatorios" }],
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
			{ esValida: false, error: "El usuario y la clave son obligatorios" },
		],
		[
			null,
			{ esValida: false, error: "El usuario y la clave son obligatorios" },
		],
		["", { esValida: false, error: "El usuario y la clave son obligatorios" }],
	])(`Should return %s when nombreUsuario is %s`, (nombreUsuario, expected) => {
		//Arrange
		//Act
		const result = validarClave(nombreUsuario, "Clave", []);

		//Assert
		expect(result).toEqual(expected);
	});
});
