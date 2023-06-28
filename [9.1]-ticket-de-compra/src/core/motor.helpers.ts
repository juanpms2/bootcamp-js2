import {
	TicketFinal,
	TipoIVAEnum,
	TotalPorTipoIva,
	ResultadoLineaTicket,
} from "./model";

export const calculaIva = (precio: number, iva: TipoIVAEnum): number => {
	if (!precio || precio <= 0 || !iva) {
		return 0;
	}

	const totalIva = (precio * iva) / 100;
	return parseFloat(totalIva.toFixed(2));
};

// export const calculaTotalDeProductoSinIva = (
// 	precio: number,
// 	cantidad: number
// ): number => {
// 	if (!precio || precio <= 0) {
// 		return 0;
// 	}
// 	if (!cantidad || cantidad <= 0) {
// 		return 0;
// 	}
// 	return precio * cantidad;
// };

// export const calculaTotalDeProductoConIva = (
// 	precio: number,
// 	cantidad: number,
// 	tipoIva: TipoIVA
// ): number => {
// 	if (!precio || precio <= 0) {
// 		return 0;
// 	}
// 	if (!cantidad || cantidad <= 0) {
// 		return 0;
// 	}
// 	if (!tipoIva) {
// 		return 0;
// 	}
// 	const totalSinIva = precio * cantidad;
// 	const totalIva = calculaIva(totalSinIva, tipoIva);

// 	return totalSinIva + totalIva;
// };

export const calculaTotalCompraSinIva = (
	listadoCompra: ResultadoLineaTicket[]
): number => {
	if (!listadoCompra || listadoCompra.length === 0) {
		return 0;
	}

	return listadoCompra.reduce((acc, item) => {
		const totalProductoSinIva = item.precioSinIva * item.cantidad;
		return acc + totalProductoSinIva;
	}, 0);
};

export const calculaTotalCompraConIva = (
	listadoCompra: ResultadoLineaTicket[]
): number => {
	if (!listadoCompra || listadoCompra.length === 0) {
		return 0;
	}
	return listadoCompra.reduce((acc, item) => {
		const { total } = item;

		return acc + total;
	}, 0);
};

export const calculaDesgloseIva = (
	listadoCompra: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
	if (!listadoCompra || listadoCompra.length === 0) {
		return [];
	}

	const totalesPorProducto: TotalPorTipoIva[] = listadoCompra.map((item) => {
		const { cantidad, precioConIva, precioSinIva, tipoIva } = item;
		const cuantia = (precioConIva - precioSinIva) * cantidad;

		return {
			tipoIva,
			cuantia: parseFloat(cuantia.toFixed(2)),
		};
	});

	const totalesPorTipoIva: TotalPorTipoIva[] = totalesPorProducto.reduce(
		(acc, item) => {
			const { tipoIva, cuantia } = item;
			const index = acc.findIndex((i) => i.tipoIva === tipoIva);
			if (index === -1) {
				return [...acc, { tipoIva, cuantia }];
			}
			acc[index].cuantia += cuantia;
			return acc;
		},
		[]
	);

	return totalesPorTipoIva;
};

export const generaTicket = (ticket: TicketFinal): string => {
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
