import {
	LineaTicket,
	ResultadoLineaTicket,
	ResultadoTotalTicket,
	TicketFinal,
	TotalPorTipoIva,
} from "../model";
import {
	calculaTotalCompraConIva,
	calculaTotalCompraSinIva,
	calculaDesgloseIva,
	calculaTotalIva,
} from "./motor.helpers";
import { mapLineaTicketAResultadoLineaTicket } from "./motor.mappers";

export const calculaTicket = (listadoCompra: LineaTicket[]): TicketFinal => {
	const lineas: ResultadoLineaTicket[] = listadoCompra.map((item) =>
		mapLineaTicketAResultadoLineaTicket(item)
	);
	const total: ResultadoTotalTicket = {
		totalSinIva: calculaTotalCompraSinIva(lineas),
		totalConIva: calculaTotalCompraConIva(lineas),
		totalIva: calculaTotalIva(lineas),
	};
	const desgloseIva: TotalPorTipoIva[] = calculaDesgloseIva(lineas);

	return {
		lineas,
		total,
		desgloseIva,
	};
};
