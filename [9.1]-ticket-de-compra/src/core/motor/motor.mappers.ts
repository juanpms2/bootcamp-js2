import {
	LineaTicket,
	ResultadoLineaTicket,
	TipoIVAEnum,
	TotalPorTipoIva,
} from "../model";
import { calculaIva } from "./motor.helpers";

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

export const mapLineaTicketAResultadoLineaTicket = (
	item: LineaTicket
): ResultadoLineaTicket => {
	const { producto, cantidad = 0 } = item;
	const { nombre, precio = 0, tipoIva } = producto;
	const iva = mapTipoIvaATipoIvaEnum(tipoIva);
	const total = precio * cantidad + iva;
	const precioConIva = calculaIva(precio, iva) + precio;

	return {
		nombre: nombre,
		cantidad: cantidad,
		precioSinIva: precio,
		precioConIva: precioConIva,
		tipoIva: tipoIva,
		total: total,
	};
};

export const mapResultadoLineaTicketATotalPorTipoIva = (
	lineaTicket: ResultadoLineaTicket
): TotalPorTipoIva => {
	const { cantidad, precioConIva, precioSinIva, tipoIva } = lineaTicket;
	const cuantia = (precioConIva - precioSinIva) * cantidad;

	return {
		tipoIva,
		cuantia: parseFloat(cuantia.toFixed(2)),
	};
};
