import { listadoCompra } from "./mock-data";
import { calculaTicket } from "./motor";

const tbodyElement = document.querySelector("tbody");
const totalSinIvaElement = document.querySelector("#total-sin-iva");
const totalIvaElement = document.querySelector("#total-iva");
const totalElement = document.querySelector("#total");
const desgloseIvaElement = document.querySelector("#desglose-iva");

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
