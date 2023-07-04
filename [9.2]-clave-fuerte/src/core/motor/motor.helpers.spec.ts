import { tieneMayusculasYMinusculas } from "./motor.helpers";

describe("motor.helpers specs", () => {
	describe("tieneMayusculasYMinusculas specs", () => {
		it("Should return esValidad equal to false and error equal to 'La clave debe tener al menos una mayúscula y una minúscula.' if clave is 'test'", () => {
			//Arrange
			const clave = "test";
			const expected = {
				esValida: false,
				error: "La clave debe tener al menos una mayúscula y una minúscula.",
			};

			//Act
			const result = tieneMayusculasYMinusculas(clave);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return esValidad equal to false and error equal to 'La clave debe tener al menos una mayúscula y una minúscula.' if clave is 'TEST'", () => {
			//Arrange
			const clave = "TEST";
			const expected = {
				esValida: false,
				error: "La clave debe tener al menos una mayúscula y una minúscula.",
			};

			//Act
			const result = tieneMayusculasYMinusculas(clave);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return esValidad equal to true and error equal to '' if clave is 'Test'", () => {
			//Arrange
			const clave = "Test";
			const expected = {
				esValida: true,
				error: "",
			};

			//Act
			const result = tieneMayusculasYMinusculas(clave);

			//Assert
			expect(result).toEqual(expected);
		});
	});
});
