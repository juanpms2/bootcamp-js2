import { createCard } from "../02-mostrar-imagen-voltear/index";

const root = document.querySelector("#app");
const title = document.createElement("h2");
title.innerHTML = "04 Mostrar segunda imagen";
root?.appendChild(title);

const firstCard = createCard(
	"card-2",
	"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png"
);
const secondCard = createCard(
	"card-3",
	"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/3.png"
);

const container = document.createElement("div");
container.className = "container";
container.appendChild(firstCard);
container.appendChild(secondCard);
root?.appendChild(container);
