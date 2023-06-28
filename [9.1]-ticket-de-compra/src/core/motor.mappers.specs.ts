import { TipoIVAEnum } from "./model";
import { mapTipoIvaATipoIvaEnum } from "./motor.mappers";

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
