import { validarClave } from "./motor";

describe("validarClave specs", () => {
	it.each([
		[undefined, { esValida: false, error: "Clave vacía" }],
		[null, { esValida: false, error: "Clave vacía" }],
		["", { esValida: false, error: "Clave vacía" }],
	])(`Should return %s when clave is %s`, (clave, expected) => {
		//Arrange
		//Act
		const result = validarClave(clave, "nombreUsuario", []);

		//Assert
		expect(result).toEqual(expected);
	});
	it.only.each([
		[
			undefined,
			{ esValida: false, error: "Necestias proporcionar un nombre de usuario" },
		],
		[
			null,
			{ esValida: false, error: "Necestias proporcionar un nombre de usuario" },
		],
		[
			"",
			{ esValida: false, error: "Necestias proporcionar un nombre de usuario" },
		],
	])(`Should return %s when nombreUsuario is %s`, (nombreUsuario, expected) => {
		//Arrange
		//Act
		const result = validarClave(nombreUsuario, "Clave", []);

		//Assert
		expect(result).toEqual(expected);
	});
});
