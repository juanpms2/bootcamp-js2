import { ResultadoLineaTicket, TotalPorTipoIva } from "../model";
import {
	calculaIva,
	calculaTotalCompraSinIva,
	calculaTotalCompraConIva,
	calculaDesgloseIva,
	calculaTotalIva,
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

	describe("calculaTotalIva specs", () => {
		it.each([
			[0, undefined],
			[0, null],
			[0, []],
		])(`Should return %s if productos equal to %s`, (expected, productos) => {
			//Arrange
			//Act
			const result = calculaTotalIva(productos);

			//Assert
			expect(result).toEqual(expected);
		});

		it("Should return 2.1", () => {
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
			const result = calculaTotalIva(productos);

			//Assert
			expect(result).toEqual(2.1);
		});

		it("Should return 5.1", () => {
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
					total: 33,
				},
			];

			//Act
			const result = calculaTotalIva(productos);

			//Assert
			expect(result).toEqual(5.1);
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
