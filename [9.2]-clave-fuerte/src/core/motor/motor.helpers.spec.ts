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
		it("Should return false if clave is 'test'", () => {
			//Arrange
			const clave = "test";

			//Act
			const result = tieneMayusculasYMinusculas(clave);

			//Assert
			expect(result).toEqual(false);
		});

		it("Should return false if clave is 'TEST'", () => {
			//Arrange
			const clave = "TEST";

			//Act
			const result = tieneMayusculasYMinusculas(clave);

			//Assert
			expect(result).toEqual(false);
		});

		it("Should return true if clave is 'Test'", () => {
			//Arrange
			const clave = "Test";

			//Act
			const result = tieneMayusculasYMinusculas(clave);

			//Assert
			expect(result).toEqual(true);
		});
	});

	describe("tieneNumeros specs", () => {
		it("Should return false if clave is 'test'", () => {
			//Arrange
			const clave = "test";

			//Act
			const result = tieneNumeros(clave);

			//Assert
			expect(result).toEqual(false);
		});

		it("Should return true if clave is 'Test1'", () => {
			//Arrange
			const clave = "Test1";

			//Act
			const result = tieneNumeros(clave);

			//Assert
			expect(result).toEqual(true);
		});
	});

	describe("tieneCaracteresEspeciales specs", () => {
		it("Should return false if clave is 'test'", () => {
			//Arrange
			const clave = "test";

			//Act
			const result = tieneCaracteresEspeciales(clave);

			//Assert
			expect(result).toEqual(false);
		});

		it("Should return true if clave is 'Test1!'", () => {
			//Arrange
			const clave = "Test1!";

			//Act
			const result = tieneCaracteresEspeciales(clave);

			//Assert
			expect(result).toEqual(true);
		});
	});

	describe("tieneLongitudMinima specs", () => {
		it("Should return false if clave is 'test'", () => {
			//Arrange
			const clave = "test";

			//Act
			const result = tieneLongitudMinima(clave);

			//Assert
			expect(result).toEqual(false);
		});

		it("Should return true  if clave is 'Test-longer-than-8'", () => {
			//Arrange
			const clave = "Test-longer-than-8";

			//Act
			const result = tieneLongitudMinima(clave);

			//Assert
			expect(result).toEqual(true);
		});
	});

	describe("tieneNombreUsuario specs", () => {
		it("Should return true if nombreUsuario is 'test' and clave is 'test'", () => {
			//Arrange
			const nombreUsuario = "test";
			const clave = "test";

			//Act
			const result = tieneNombreUsuario(nombreUsuario, clave);

			//Assert
			expect(result).toEqual(true);
		});

		it("Should return true if clave include nombreUsuario", () => {
			//Arrange
			const nombreUsuario = "test";
			const clave = "claveTest";

			//Act
			const result = tieneNombreUsuario(nombreUsuario, clave);

			//Assert
			expect(result).toEqual(true);
		});

		it("Should return false if nombreUsuario is 'test' and clave is 'clave'", () => {
			//Arrange
			const nombreUsuario = "test";
			const clave = "clave";
			//Act
			const result = tieneNombreUsuario(nombreUsuario, clave);

			//Assert
			expect(result).toEqual(false);
		});
	});

	describe("tienePalabrasComunes specs", () => {
		it("Should return false if clave is include in commonPasswords", () => {
			//Arrange
			const clave = "test";
			const commonPasswords = ["test", "test1", "test2"];

			//Act
			const result = tienePalabrasComunes(clave, commonPasswords);

			//Assert
			expect(result).toEqual(false);
		});

		it("Should return false  if clave is not include in commonPasswords", () => {
			//Arrange
			const clave = "Test1!";
			const commonPasswords = ["test", "test1", "test2"];

			//Act
			const result = tienePalabrasComunes(clave, commonPasswords);

			//Assert
			expect(result).toEqual(true);
		});
	});
});
