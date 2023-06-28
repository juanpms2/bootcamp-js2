import { TipoIVAEnum, TotalPorTipoIva, ResultadoLineaTicket } from "../model";
import { mapResultadoLineaTicketATotalPorTipoIva } from "./motor.mappers";

export const calculaIva = (precio: number, iva: TipoIVAEnum): number => {
	if (!precio || precio <= 0 || !iva) {
		return 0;
	}

	const totalIva = (precio * iva) / 100;
	return parseFloat(totalIva.toFixed(2));
};

export const calculaTotalCompraSinIva = (
	listadoCompra: ResultadoLineaTicket[]
): number => {
	const totalCompraSinIva = listadoCompra?.reduce((acc, item) => {
		const totalProductoSinIva = item.precioSinIva * item.cantidad;
		return parseFloat((acc + totalProductoSinIva).toFixed(2));
	}, 0);

	return listadoCompra ? totalCompraSinIva : 0;
};

export const calculaTotalCompraConIva = (
	listadoCompra: ResultadoLineaTicket[]
): number => {
	const totalCompraConIva = listadoCompra?.reduce((acc, item) => {
		const { total } = item;

		return parseFloat((acc + total).toFixed(2));
	}, 0);

	return listadoCompra ? totalCompraConIva : 0;
};

export const calculaTotalIva = (
	listadoCompra: ResultadoLineaTicket[]
): number => {
	const totalIva = listadoCompra?.reduce((acc, item) => {
		const { tipoIva, precioSinIva, cantidad } = item;
		const totalIva = calculaIva(precioSinIva * cantidad, TipoIVAEnum[tipoIva]);
		return parseFloat((acc + totalIva).toFixed(2));
	}, 0);

	return listadoCompra ? totalIva : 0;
};

const obtenerTotalesPorProducto = (
	listadoCompra: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
	const totalesPorProducto = listadoCompra?.map((lineaTicket) =>
		mapResultadoLineaTicketATotalPorTipoIva(lineaTicket)
	);

	return totalesPorProducto;
};

const obtenerTotalesPorTipoIva = (
	totalesPorProducto: TotalPorTipoIva[]
): TotalPorTipoIva[] =>
	totalesPorProducto?.reduce(
		(acc: TotalPorTipoIva[], item: TotalPorTipoIva) => {
			const { tipoIva, cuantia } = item;
			const index = acc.findIndex((i) => i.tipoIva === tipoIva);
			if (index === -1) {
				return [...acc, { tipoIva, cuantia: parseFloat(cuantia.toFixed(2)) }];
			}
			parseFloat((acc[index].cuantia += cuantia).toFixed(2));
			return acc;
		},
		[]
	);

export const calculaDesgloseIva = (
	listadoCompra: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
	const totalesPorProducto = obtenerTotalesPorProducto(listadoCompra);
	const totalesPorTipoIva = obtenerTotalesPorTipoIva(totalesPorProducto);

	return !listadoCompra ? [] : totalesPorTipoIva;
};
