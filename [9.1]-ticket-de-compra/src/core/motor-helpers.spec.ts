import { LineaTicket, TipoIVA, TipoIVAEnum } from "./model";
import {
	mapTipoIvaATipoIvaEnum,
	calculaIva,
	calculaTotalDeProductoSinIva,
	calculaTotalDeProductoConIva,
	calculaTotalCompraSinIva,
	calculaTotalCompraConIva,
} from "./motor.helpers";

describe("motor.helpers specs", () => {
	describe("mapTipoIvaATipoIvaEnum", () => {
		it.each([
			[TipoIVAEnum.sinIva, undefined],
			[TipoIVAEnum.sinIva, null],
			[TipoIVAEnum.sinIva, ""],
			[TipoIVAEnum.sinIva, "sinIva"],
			[TipoIVAEnum.general, "general"],
			[TipoIVAEnum.reducido, "reducido"],
			[TipoIVAEnum.superreducidoA, "superreducidoA"],
			[TipoIVAEnum.superreducidoB, "superreducidoB"],
			[TipoIVAEnum.superreducidoC, "superreducidoC"],
		])(`Should return %s if tipoIva equal to %s`, (expected, tipoIva) => {
			//Arrange
			//Act
			const result = mapTipoIvaATipoIvaEnum(tipoIva);
			//Assert
			expect(result).toEqual(expected);
		});
	});

	describe("calculaIva specs", () => {
		it.each([
			[0, undefined, "general"],
			[0, null, "general"],
			[0, 0, "general"],
			[0, -1, "general"],
		])(
			`Should return %s if precio equal to %s`,
			(expected, precio, tipoIva) => {
				//Arrange
				//Act
				const result = calculaIva(precio, tipoIva as TipoIVA);

				//Assert
				expect(result).toEqual(expected);
			}
		);
		it("Should return 0 if tipoIva is sinIva", () => {
			//Arrange
			const precio = 10;
			const tipoIva = "sinIva";

			//Act
			const result = calculaIva(precio, tipoIva);

			//Assert
			expect(result).toEqual(0);
		});

		it("Should return 21 if tipoIva is general and precio is 100", () => {
			//Arrange
			const precio = 100;
			const tipoIva = "general";

			//Act
			const result = calculaIva(precio, tipoIva);

			//Assert
			expect(result).toEqual(21);
		});

		it("Should return 17,92 (only two decimals) if tipoIva is general and precio is 85,32", () => {
			//Arrange
			const precio = 85.32;
			const tipoIva = "general";

			//Act
			const result = calculaIva(precio, tipoIva);

			//Assert
			expect(result).toEqual(17.92);
		});
	});

	describe("calculaTotalDeProductoSinIva specs", () => {
		it.each([
			[0, undefined, undefined],
			[0, null, null],
			[0, 0, 0],
			[0, undefined, 0],
			[0, undefined, null],
			[0, null, 0],
			[0, null, undefined],
			[0, 0, undefined],
			[0, 0, null],
		])(
			`Should return %s if precio equal to %s and cantidad equal to %s`,
			(expected, precio, cantidad) => {
				//Arrange
				//Act
				const result = calculaTotalDeProductoSinIva(precio, cantidad);

				//Assert
				expect(result).toEqual(expected);
			}
		);

		it("Should return 20 if precio is 10 and cantidad is 2", () => {
			//Arrange
			const precio = 10;
			const cantidad = 2;

			//Act
			const result = calculaTotalDeProductoSinIva(precio, cantidad);

			//Assert
			expect(result).toEqual(20);
		});
	});

	describe("calculaTotalDeProductoConIva specs", () => {
		it.each([
			[0, undefined, undefined, undefined],
			[0, null, null, undefined],
			[0, 0, 0, undefined],
			[0, undefined, 0, undefined],
			[0, undefined, null, undefined],
			[0, null, 0, undefined],
			[0, null, undefined, undefined],
			[0, 0, undefined, undefined],
			[0, 0, null, undefined],
		])(
			`Should return %s if precio equal to %s, cantidad equal to %s and tipoIva equal to %s`,
			(expected, precio, cantidad, tipoIva) => {
				//Arrange
				//Act
				const result = calculaTotalDeProductoConIva(
					precio,
					cantidad,
					tipoIva as TipoIVA
				);

				//Assert
				expect(result).toEqual(expected);
			}
		);

		it("Should return 20 if precio is 10, cantidad is 2 and tipoIva is sinIva", () => {
			//Arrange
			const precio = 10;
			const cantidad = 2;
			const tipoIva = "sinIva";

			//Act
			const result = calculaTotalDeProductoConIva(precio, cantidad, tipoIva);

			//Assert
			expect(result).toEqual(20);
		});

		it("Should return 24,2 if precio is 10, cantidad is 2 and tipoIva is general", () => {
			//Arrange
			const precio = 10;
			const cantidad = 2;
			const tipoIva = "general";

			//Act
			const result = calculaTotalDeProductoConIva(precio, cantidad, tipoIva);

			//Assert
			expect(result).toEqual(24.2);
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
			const productos: LineaTicket[] = [
				{
					producto: {
						nombre: "Producto 1",
						precio: 10,
						tipoIva: "general",
					},
					cantidad: 1,
				},
			];

			//Act
			const result = calculaTotalCompraSinIva(productos);

			//Assert
			expect(result).toEqual(10);
		});

		it("Should return 40", () => {
			//Arrange
			const productos: LineaTicket[] = [
				{
					producto: {
						nombre: "Producto 1",
						precio: 10,
						tipoIva: "general",
					},
					cantidad: 1,
				},
				{
					producto: {
						nombre: "Producto 2",
						precio: 15,
						tipoIva: "reducido",
					},
					cantidad: 2,
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
			const productos: LineaTicket[] = [
				{
					producto: {
						nombre: "Producto 1",
						precio: 10,
						tipoIva: "general",
					},
					cantidad: 1,
				},
			];

			//Act
			const result = calculaTotalCompraConIva(productos);

			//Assert
			expect(result).toEqual(12.1);
		});

		it("Should return 45.1", () => {
			//Arrange
			const productos: LineaTicket[] = [
				{
					producto: {
						nombre: "Producto 1",
						precio: 10,
						tipoIva: "general",
					},
					cantidad: 1,
				},
				{
					producto: {
						nombre: "Producto 2",
						precio: 15,
						tipoIva: "reducido",
					},
					cantidad: 2,
				},
			];

			//Act
			const result = calculaTotalCompraConIva(productos);

			//Assert
			expect(result).toEqual(45.1);
		});
	});
});
