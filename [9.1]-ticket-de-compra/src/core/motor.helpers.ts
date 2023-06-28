import { TipoIVAEnum, TotalPorTipoIva, ResultadoLineaTicket } from "./model";
import { mapResultadoLineaTicketATotalPorTipoIva } from "./motor.mappers";

const elementInDOM = (id: string) => document.getElementById(id);

export const elementReady = (id: string) => {
	const element = elementInDOM(id);
	if (element && element instanceof HTMLElement) {
		return element;
	}
	console.log(new Error(`Element with id ${id} not found in DOM`));
	return null;
};

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
	if (!listadoCompra) {
		return 0;
	}

	return listadoCompra.reduce((acc, item) => {
		const totalProductoSinIva = item.precioSinIva * item.cantidad;
		return parseFloat((acc + totalProductoSinIva).toFixed(2));
	}, 0);
};

export const calculaTotalCompraConIva = (
	listadoCompra: ResultadoLineaTicket[]
): number => {
	if (!listadoCompra) {
		return 0;
	}
	return listadoCompra.reduce((acc, item) => {
		const { total } = item;

		return parseFloat((acc + total).toFixed(2));
	}, 0);
};

export const calculaTotalIva = (
	listadoCompra: ResultadoLineaTicket[]
): number => {
	if (!listadoCompra) {
		return 0;
	}

	return listadoCompra.reduce((acc, item) => {
		const { tipoIva, precioSinIva, cantidad } = item;
		const totalIva = calculaIva(precioSinIva * cantidad, TipoIVAEnum[tipoIva]);
		return parseFloat((acc + totalIva).toFixed(2));
	}, 0);
};

export const calculaDesgloseIva = (
	listadoCompra: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
	if (!listadoCompra) {
		return [];
	}

	const totalesPorProducto: TotalPorTipoIva[] = listadoCompra.map(
		(lineaTicket) => mapResultadoLineaTicketATotalPorTipoIva(lineaTicket)
	);

	const totalesPorTipoIva: TotalPorTipoIva[] = totalesPorProducto.reduce(
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

	return totalesPorTipoIva;
};
