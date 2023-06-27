import {
	TicketFinal,
	Producto,
	TipoIVAEnum,
	TipoIVA,
	LineaTicket,
	TotalPorTipoIva,
} from "./model";

export const mapTipoIvaATipoIvaEnum = (tipoIva: string): TipoIVAEnum => {
	switch (tipoIva) {
		case "general":
			return TipoIVAEnum.general;
		case "reducido":
			return TipoIVAEnum.reducido;
		case "superreducidoA":
			return TipoIVAEnum.superreducidoA;
		case "superreducidoB":
			return TipoIVAEnum.superreducidoB;
		case "superreducidoC":
			return TipoIVAEnum.superreducidoC;
		case "sinIva":
		default:
			return TipoIVAEnum.sinIva;
	}
};

export const calculaIva = (precio: number, tipoIva: TipoIVA): number => {
	if (!precio || precio <= 0 || !tipoIva) {
		return 0;
	}

	const iva = precio * (mapTipoIvaATipoIvaEnum(tipoIva) / 100);
	return parseFloat(iva.toFixed(2));
};

export const calculaTotalDeProductoSinIva = (
	precio: number,
	cantidad: number
): number => {
	if (!precio || precio <= 0) {
		return 0;
	}
	if (!cantidad || cantidad <= 0) {
		return 0;
	}
	return precio * cantidad;
};

export const calculaTotalDeProductoConIva = (
	precio: number,
	cantidad: number,
	tipoIva: TipoIVA
): number => {
	if (!precio || precio <= 0) {
		return 0;
	}
	if (!cantidad || cantidad <= 0) {
		return 0;
	}
	if (!tipoIva) {
		return 0;
	}
	const totalSinIva = calculaTotalDeProductoSinIva(precio, cantidad);
	const totalIva = calculaIva(totalSinIva, tipoIva);

	return totalSinIva + totalIva;
};

export const calculaTotalCompraSinIva = (productos: LineaTicket[]): number => {
	if (!productos || productos.length === 0) {
		return 0;
	}
	return productos.reduce((acc, item) => {
		const { producto, cantidad } = item;
		const { precio } = producto;
		const totalProductoSinIva = calculaTotalDeProductoSinIva(precio, cantidad);
		return acc + totalProductoSinIva;
	}, 0);
};

export const calculaTotalCompraConIva = (productos: LineaTicket[]): number => {
	if (!productos || productos.length === 0) {
		return 0;
	}
	return productos.reduce((acc, item) => {
		const { producto, cantidad } = item;
		const { precio, tipoIva } = producto;
		const totalProductoConIva = calculaTotalDeProductoConIva(
			precio,
			cantidad,
			tipoIva
		);
		return acc + totalProductoConIva;
	}, 0);
};

export const desgloseIva = (productos: LineaTicket[]): TotalPorTipoIva[] => {
	return [];
};

export const formatTicket = (ticket: TicketFinal): string => {
	const { lineas, total } = ticket;
	const { totalSinIva, totalConIva, totalIva } = total;

	const lineasTicket = lineas
		.map((linea) => {
			const { nombre, cantidad, precioSinIva, tipoIva, precioConIva, total } =
				linea;
			return `
    -----------------------------------------------------------------------------------------------------\n
                                            Ticket de Compra\n
    -----------------------------------------------------------------------------------------------------\n
    | Nombre     | Cantidad | Precio sin IVA (ud.) | Tipo de IVA    | Precio con IVA (ud.) |      Total |\n
    -----------------------------------------------------------------------------------------------------
    | ${nombre} |        ${cantidad} |                   ${precioSinIva} |        ${tipoIva} |                  ${precioConIva} |        ${total} |
    -----------------------------------------------------------------------------------------------------
    \n
    Total sin IVA: ${totalSinIva.toFixed(2)}\n
    IVA: ${totalIva.toFixed(2)}\n
    Desglose IVA: ${100}\n
    ----------------------------------------------------------------------------------------------------\n
                                                                                  Total del Ticket: ${totalConIva}\n
    ----------------------------------------------------------------------------------------------------\n`;
		})
		.join("\n");

	return lineasTicket;
};
