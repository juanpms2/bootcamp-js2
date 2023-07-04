import {
	tieneMayusculasYMinusculas,
	tieneNumeros,
	tieneCaracteresEspeciales,
	tieneLongitudMinima,
	tieneNombreUsuario,
	tienePalabrasComunes,
} from "./motor.helpers";

describe("motor.helpers specs", () => {
	describe("tieneMayusculasYMinusculas specs", () => {
		it("Should return esValida equal to false and error equal to 'La clave debe tener al menos una mayúscula y una minúscula.' if clave is 'test'", () => {
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

		it("Should return esValida equal to false and error equal to 'La clave debe tener al menos una mayúscula y una minúscula.' if clave is 'TEST'", () => {
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

		it("Should return esValida equal to true and error equal to '' if clave is 'Test'", () => {
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

	describe("tieneNumeros specs", () => {
		it("Should return esValida equal to false and error equal to 'La clave debe tener al menos un número.' if clave is 'test'", () => {
			//Arrange
			const clave = "test";
			const expected = {
				esValida: false,
				error: "La clave debe tener al menos un número.",
			};

			//Act
			const result = tieneNumeros(clave);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return esValida equal to true and error equal to '' if clave is 'Test1'", () => {
			//Arrange
			const clave = "Test1";
			const expected = {
				esValida: true,
				error: "",
			};

			//Act
			const result = tieneNumeros(clave);

			//Assert
			expect(result).toEqual(expected);
		});
	});

	describe("tieneCaracteresEspeciales specs", () => {
		it("Should return esValida equal to false and error equal to 'La clave debe tener al menos un caracter especial.' if clave is 'test'", () => {
			//Arrange
			const clave = "test";
			const expected = {
				esValida: false,
				error: "La clave debe tener al menos un caracter especial.",
			};

			//Act
			const result = tieneCaracteresEspeciales(clave);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return esValida equal to true and error equal to '' if clave is 'Test1!'", () => {
			//Arrange
			const clave = "Test1!";
			const expected = {
				esValida: true,
				error: "",
			};

			//Act
			const result = tieneCaracteresEspeciales(clave);

			//Assert
			expect(result).toEqual(expected);
		});
	});

	describe("tieneLongitudMinima specs", () => {
		it("Should return esValida equal to false and error equal to 'La clave debe tener al menos 8 caracteres.' if clave is 'test'", () => {
			//Arrange
			const clave = "test";
			const expected = {
				esValida: false,
				error: "La clave debe tener al menos 8 caracteres.",
			};

			//Act
			const result = tieneLongitudMinima(clave);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return esValida equal to true and error equal to '' if clave is 'Test-longer-than-8'", () => {
			//Arrange
			const clave = "Test-longer-than-8";
			const expected = {
				esValida: true,
				error: "",
			};

			//Act
			const result = tieneLongitudMinima(clave);

			//Assert
			expect(result).toEqual(expected);
		});
	});

	describe("tieneNombreUsuario specs", () => {
		it("Should return esValida equal to false and error equal to 'El nombre de usuario no puede estar en la clave.' if nombreUsuario is 'test' and clave is 'clave'", () => {
			//Arrange
			const nombreUsuario = "test";
			const clave = "clave";
			const expected = {
				esValida: false,
				error: "",
			};

			//Act
			const result = tieneNombreUsuario(nombreUsuario, clave);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return esValida equal to true and error equal to '' if nombreUsuario is 'test' and clave is 'clavetest'", () => {
			//Arrange
			const nombreUsuario = "test";
			const clave = "clavetest";
			const expected = {
				esValida: true,
				error: "La clave no puede contener el nombre de usuario.",
			};

			//Act
			const result = tieneNombreUsuario(nombreUsuario, clave);

			//Assert
			expect(result).toEqual(expected);
		});
	});

	describe("tienePalabrasComunes specs", () => {
		it("Should return esValida equal to false and error equal to 'test es una clave muy común.' if clave is 'test'", () => {
			//Arrange
			const clave = "test";
			const commonPasswords = ["test", "test1", "test2"];
			const expected = {
				esValida: false,
				error: `${clave} es una clave muy común., ${commonPasswords}`,
			};

			//Act
			const result = tienePalabrasComunes(clave, commonPasswords);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return esValida equal to true and error equal to '' if clave is 'Test1!'", () => {
			//Arrange
			const clave = "Test1!";
			const commonPasswords = ["test", "test1", "test2"];
			const expected = {
				esValida: true,
				error: "",
			};

			//Act
			const result = tienePalabrasComunes(clave, commonPasswords);

			//Assert
			expect(result).toEqual(expected);
		});
	});
});
