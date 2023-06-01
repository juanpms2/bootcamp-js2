import { cardList } from "../../data";
import { createCard } from "../02-mostrar-imagen-voltear";

const root = document.querySelector("#app");
const title = document.createElement("h2");
title.innerHTML = "05 Mapear divs";
root?.appendChild(title);

const container = document.createElement("div");
container.className = "container";
root?.appendChild(container);

for (let i = 0; i < cardList.length; i++) {
	container?.appendChild(createCard(i));
}
