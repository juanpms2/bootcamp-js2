import { LineaTicket, ResultadoLineaTicket, TipoIVAEnum } from "./model";
import { calculaIva } from "./motor.helpers";

export const mapLineaTicketAResultadoLineaTicket = (
	item: LineaTicket
): ResultadoLineaTicket => {
	const { producto, cantidad = 0 } = item;
	const { nombre, precio = 0, tipoIva } = producto;
	const iva = mapTipoIvaATipoIvaEnum(tipoIva);

	return {
		nombre: nombre,
		cantidad: cantidad,
		precioSinIva: precio,
		precioConIva: calculaIva(precio, iva) + precio,
		tipoIva: tipoIva,
		total: precio * cantidad + iva,
	};
};

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
