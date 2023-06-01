import { createCard } from "../02-mostrar-imagen-voltear";

const root = document.querySelector("#app");
const title = document.createElement("h2");
title.innerHTML = "05 Mapear divs";
root?.appendChild(title);

interface Card {
	id: number;
	url: string;
}

const cardList: Card[] = [
	{
		id: 10,
		url: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
	},
	{
		id: 20,
		url: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
	},
	{
		id: 30,
		url: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png",
	},
	{
		id: 40,
		url: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png",
	},
];

const container = document.createElement("div");
container.className = "container";
root?.appendChild(container);

for (const card of cardList) {
	container?.appendChild(createCard(`card-${card.id}`, card.url));
}
