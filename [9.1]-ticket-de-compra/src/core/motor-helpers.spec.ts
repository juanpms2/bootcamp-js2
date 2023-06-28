import { ResultadoLineaTicket, TotalPorTipoIva } from "./model";
import {
	calculaIva,
	calculaTotalCompraSinIva,
	calculaTotalCompraConIva,
	calculaDesgloseIva,
} from "./motor.helpers";

describe("motor.helpers specs", () => {
	describe("calculaIva specs", () => {
		it.each([
			[0, undefined, 21],
			[0, null, 21],
			[0, 0, 21],
			[0, -1, 21],
		])(`Should return %s if precio equal to %s`, (expected, precio, iva) => {
			//Arrange
			//Act
			const result = calculaIva(precio, iva);

			//Assert
			expect(result).toEqual(expected);
		});
		it("Should return 0 if tipoIva is sinIva", () => {
			//Arrange
			const precio = 10;
			const iva = 0;

			//Act
			const result = calculaIva(precio, iva);

			//Assert
			expect(result).toEqual(0);
		});

		it("Should return 21 if tipoIva is general and precio is 100", () => {
			//Arrange
			const precio = 100;
			const iva = 21;

			//Act
			const result = calculaIva(precio, iva);

			//Assert
			expect(result).toEqual(21);
		});

		it("Should return 17,92 (only two decimals) if tipoIva is general and precio is 85,32", () => {
			//Arrange
			const precio = 85.32;
			const iva = 21;

			//Act
			const result = calculaIva(precio, iva);

			//Assert
			expect(result).toEqual(17.92);
		});
	});

	// describe("calculaTotalDeProductoSinIva specs", () => {
	// 	it.each([
	// 		[0, undefined, undefined],
	// 		[0, null, null],
	// 		[0, 0, 0],
	// 		[0, undefined, 0],
	// 		[0, undefined, null],
	// 		[0, null, 0],
	// 		[0, null, undefined],
	// 		[0, 0, undefined],
	// 		[0, 0, null],
	// 	])(
	// 		`Should return %s if precio equal to %s and cantidad equal to %s`,
	// 		(expected, precio, cantidad) => {
	// 			//Arrange
	// 			//Act
	// 			const result = calculaTotalDeProductoSinIva(precio, cantidad);

	// 			//Assert
	// 			expect(result).toEqual(expected);
	// 		}
	// 	);

	// 	it("Should return 20 if precio is 10 and cantidad is 2", () => {
	// 		//Arrange
	// 		const precio = 10;
	// 		const cantidad = 2;

	// 		//Act
	// 		const result = calculaTotalDeProductoSinIva(precio, cantidad);

	// 		//Assert
	// 		expect(result).toEqual(20);
	// 	});
	// });

	// describe("calculaTotalDeProductoConIva specs", () => {
	// 	it.each([
	// 		[0, undefined, undefined, undefined],
	// 		[0, null, null, undefined],
	// 		[0, 0, 0, undefined],
	// 		[0, undefined, 0, undefined],
	// 		[0, undefined, null, undefined],
	// 		[0, null, 0, undefined],
	// 		[0, null, undefined, undefined],
	// 		[0, 0, undefined, undefined],
	// 		[0, 0, null, undefined],
	// 	])(
	// 		`Should return %s if precio equal to %s, cantidad equal to %s and tipoIva equal to %s`,
	// 		(expected, precio, cantidad, tipoIva) => {
	// 			//Arrange
	// 			//Act
	// 			const result = calculaTotalDeProductoConIva(
	// 				precio,
	// 				cantidad,
	// 				tipoIva as TipoIVA
	// 			);

	// 			//Assert
	// 			expect(result).toEqual(expected);
	// 		}
	// 	);

	// 	it("Should return 20 if precio is 10, cantidad is 2 and tipoIva is sinIva", () => {
	// 		//Arrange
	// 		const precio = 10;
	// 		const cantidad = 2;
	// 		const tipoIva = "sinIva";

	// 		//Act
	// 		const result = calculaTotalDeProductoConIva(precio, cantidad, tipoIva);

	// 		//Assert
	// 		expect(result).toEqual(20);
	// 	});

	// 	it("Should return 24,2 if precio is 10, cantidad is 2 and tipoIva is general", () => {
	// 		//Arrange
	// 		const precio = 10;
	// 		const cantidad = 2;
	// 		const tipoIva = "general";

	// 		//Act
	// 		const result = calculaTotalDeProductoConIva(precio, cantidad, tipoIva);

	// 		//Assert
	// 		expect(result).toEqual(24.2);
	// 	});
	// });

	describe("calculaTotalCompraSinIva specs", () => {
		it.each([
			[0, undefined],
			[0, null],
			[0, []],
		])(`Should return %s if productos equal to %s`, (expected, productos) => {
			//Arrange
			//Act
			const result = calculaTotalCompraSinIva(productos);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return 10 ", () => {
			//Arrange
			const productos: ResultadoLineaTicket[] = [
				{
					nombre: "Producto 1",
					cantidad: 1,
					precioSinIva: 10,
					tipoIva: "general",
					precioConIva: 12.1,
					total: 12.1,
				},
			];

			//Act
			const result = calculaTotalCompraSinIva(productos);

			//Assert
			expect(result).toEqual(10);
		});

		it("Should return 40", () => {
			//Arrange
			const productos: ResultadoLineaTicket[] = [
				{
					nombre: "Producto 1",
					cantidad: 1,
					precioSinIva: 10,
					tipoIva: "general",
					precioConIva: 12.1,
					total: 12.1,
				},
				{
					nombre: "Producto 2",
					cantidad: 2,
					precioSinIva: 15,
					tipoIva: "reducido",
					precioConIva: 16.5,
					total: 18,
				},
			];

			//Act
			const result = calculaTotalCompraSinIva(productos);

			//Assert
			expect(result).toEqual(40);
		});
	});

	describe("calculaTotalCompraConIva specs", () => {
		it.each([
			[0, undefined],
			[0, null],
			[0, []],
		])(`Should return %s if productos equal to %s`, (expected, productos) => {
			//Arrange
			//Act
			const result = calculaTotalCompraConIva(productos);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return 12.1", () => {
			//Arrange
			const productos: ResultadoLineaTicket[] = [
				{
					nombre: "Producto 1",
					cantidad: 1,
					precioSinIva: 10,
					tipoIva: "general",
					precioConIva: 12.1,
					total: 12.1,
				},
			];

			//Act
			const result = calculaTotalCompraConIva(productos);

			//Assert
			expect(result).toEqual(12.1);
		});

		it("Should return 30.1", () => {
			//Arrange
			const productos: ResultadoLineaTicket[] = [
				{
					nombre: "Producto 1",
					cantidad: 1,
					precioSinIva: 10,
					tipoIva: "general",
					precioConIva: 12.1,
					total: 12.1,
				},
				{
					nombre: "Producto 2",
					cantidad: 2,
					precioSinIva: 15,
					tipoIva: "reducido",
					precioConIva: 16.5,
					total: 18,
				},
			];

			//Act
			const result = calculaTotalCompraConIva(productos);

			//Assert
			expect(result).toEqual(30.1);
		});
	});

	describe("desgloseIva specs", () => {
		it.each([
			[[], undefined],
			[[], null],
		])(
			`Should return %s if listadoCompra equal to %s`,
			(expected, listadoCompra) => {
				//Arrange
				//Act
				const result = calculaDesgloseIva(listadoCompra);

				//Assert
				expect(result).toEqual(expected);
			}
		);
		it("Should return a TotalPorTipoIva array with tipoIva equal general and cuantía equal to 20", () => {
			//Arrange
			const productos: ResultadoLineaTicket[] = [
				{
					nombre: "Producto 1",
					cantidad: 1,
					precioConIva: 12.1,
					tipoIva: "general",
					precioSinIva: 10,
					total: 12.1,
				},
				{
					nombre: "Producto 2",
					cantidad: 6,
					precioConIva: 16.5,
					tipoIva: "reducido",
					precioSinIva: 15,
					total: 99,
				},
				{
					nombre: "Producto 5",
					cantidad: 1,
					precioConIva: 13.2,
					tipoIva: "reducido",
					precioSinIva: 12,
					total: 13.2,
				},
			];

			//Act
			const result = calculaDesgloseIva(productos);
			const expectedResult: TotalPorTipoIva[] = [
				{
					cuantia: 2.1,
					tipoIva: "general",
				},
				{
					cuantia: 10.2,
					tipoIva: "reducido",
				},
			];

			//Assert
			expect(result).toEqual(expectedResult);
		});
	});
});
