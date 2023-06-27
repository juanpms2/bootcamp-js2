import { ResultadoLineaTicket, ResultadoTotalTicket } from "./model";

interface TicketFinal {
	lineas: ResultadoLineaTicket[];
	total: ResultadoTotalTicket;
}

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
