import { createCard } from "../02-mostrar-imagen-voltear/index";

const root = document.querySelector("#app");
const title = document.createElement("h2");
title.innerHTML = "04 Mostrar segunda imagen";
root?.appendChild(title);

const firstCard = createCard(1);
const secondCard = createCard(2);

const container = document.createElement("div");
container.className = "container";
container.appendChild(firstCard);
container.appendChild(secondCard);
root?.appendChild(container);
