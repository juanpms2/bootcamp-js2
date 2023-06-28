import {
	LineaTicket,
	ResultadoLineaTicket,
	ResultadoTotalTicket,
	TotalPorTipoIva,
} from "./model";
import {
	calculaTotalCompraConIva,
	calculaTotalCompraSinIva,
	calculaDesgloseIva,
	generaTicket,
} from "./motor.helpers";
import { mapLineaTicketAResultadoLineaTicket } from "./motor.mappers";

export const calculaTicket = (listadoCompra: LineaTicket[]): void => {
	const lineas: ResultadoLineaTicket[] = listadoCompra.map((item) =>
		mapLineaTicketAResultadoLineaTicket(item)
	);
	const total: ResultadoTotalTicket = {
		totalSinIva: calculaTotalCompraSinIva(lineas),
		totalConIva: calculaTotalCompraConIva(lineas),
		totalIva: calculaTotalCompraSinIva(lineas),
	};
	const desgloseIva: TotalPorTipoIva[] = calculaDesgloseIva(lineas);

	const ticket = generaTicket({ lineas, total, desgloseIva });

	console.log(ticket);
};
