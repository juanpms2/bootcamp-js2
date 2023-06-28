export type TipoIVA =
	| "general"
	| "reducido"
	| "superreducidoA"
	| "superreducidoB"
	| "superreducidoC"
	| "sinIva";

export enum TipoIVAEnum {
	general = 21,
	reducido = 10,
	superreducidoA = 5,
	superreducidoB = 4,
	superreducidoC = 0,
	sinIva = 0,
}

export interface Producto {
	nombre: string;
	precio: number;
	tipoIva: TipoIVA;
}

export interface LineaTicket {
	producto: Producto;
	cantidad: number;
}

export interface ResultadoLineaTicket {
	nombre: string;
	cantidad: number;
	precioSinIva: number;
	tipoIva: TipoIVA;
	precioConIva: number;
	total: number;
}

export interface ResultadoTotalTicket {
	totalSinIva: number;
	totalConIva: number;
	totalIva: number;
}

export interface TotalPorTipoIva {
	tipoIva: TipoIVA;
	cuantia: number;
}

export interface TicketFinal {
	lineas: ResultadoLineaTicket[];
	total: ResultadoTotalTicket;
	desgloseIva: TotalPorTipoIva[];
}
