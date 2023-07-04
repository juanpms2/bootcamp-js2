import { validarClave } from "./motor";

describe("validarClave specs", () => {
	it.each([
		[undefined, { esValida: false, error: "Clave vacíall" }],
		[null, { esValida: false, error: "Clave vacía" }],
		["", { esValida: false, error: "Clave vacía" }],
	])(`Should return %s when clave is %s`, (clave, expected) => {
		//Arrange
		//Act
		const result = validarClave(clave, "", []);

		//Assert
		expect(result).toEqual(expected);
	});
	it.only("Should return false if clave is 'test'", () => {
		//Arrange
		const clave = "test";

		//Act
		const result = validarClave(clave, "", []);

		//Assert
		expect(result).toEqual(false);
	});
});
