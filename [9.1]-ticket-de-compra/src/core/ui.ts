import { listadoCompra } from "./mock-data";
import { calculaTicket } from "./motor";
import { elementReady } from "./helpers";

const tbodyElement = elementReady("tbody");
const totalSinIvaElement = elementReady("total-sin-iva");
const totalIvaElement = elementReady("total-iva");
const totalElement = elementReady("total");
const desgloseIvaElement = elementReady("desglose-iva");

export const loadApp = () => {
	const ticket = calculaTicket(listadoCompra);
	const { lineas, total, desgloseIva } = ticket;

	lineas.forEach((linea) => {
		const { nombre, cantidad, precioSinIva, tipoIva, precioConIva, total } =
			linea;
		const tr = document.createElement("tr");
		tr.innerHTML = `
      <td>${nombre}</td>
      <td>${cantidad}</td>
      <td>${precioSinIva}</td>
      <td>${tipoIva}</td>
      <td>${precioConIva}</td>
      <td>${total}</td>
    `;
		tbodyElement?.appendChild(tr);
	});

	const { totalSinIva, totalIva, totalConIva } = total;
	totalSinIvaElement!.innerHTML = totalSinIva.toString();
	totalIvaElement!.innerHTML = totalIva.toString();
	totalElement!.innerHTML = totalConIva.toString();

	desgloseIva.forEach((item) => {
		const { tipoIva, cuantia } = item;
		const tr = document.createElement("tr");
		tr.innerHTML = `
      <td>${tipoIva}</td>
      <td>${cuantia.toFixed(2)}</td>
    `;
		desgloseIvaElement?.appendChild(tr);
	});
};
