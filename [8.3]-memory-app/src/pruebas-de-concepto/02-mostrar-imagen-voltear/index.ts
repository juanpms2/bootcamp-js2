import { cardList } from "../../data";
import { Card } from "../../model";
const root = document.querySelector("#app");
const title = document.createElement("h2");
title.innerHTML = "02 Mostrar imagen y voltear";
root?.appendChild(title);

export const createCard = (index: number) => {
	const root = document.querySelector("#app");

	const card: Card = cardList[index];
	const id = `card-${card.id}`;

	const flipContainer: HTMLDivElement = document.createElement("div");
	flipContainer.setAttribute("class", "flip-container");
	flipContainer.setAttribute("id", id);
	flipContainer.setAttribute("data-index-id", index.toString());
	root?.appendChild(flipContainer);

	const flipper: HTMLDivElement = document.createElement("div");
	flipper.setAttribute("class", "flipper");
	flipContainer.appendChild(flipper);

	const front: HTMLDivElement = document.createElement("div");
	front.setAttribute("class", "front");
	flipper.appendChild(front);

	const back: HTMLDivElement = document.createElement("div");
	back.setAttribute("class", "back");
	back.setAttribute(
		"style",
		`background-image: url(${card.url}), linear-gradient(to bottom, rgba(30, 75, 115, .2), rgba(255, 255, 255, 0))`
	);
	flipper.appendChild(back);

	flipContainer.addEventListener("click", () => {
		document.querySelector(`#${id}`)?.classList.add("flip");
		setTimeout(() => {
			document.querySelector(`#${id}`)?.classList.remove("flip");
		}, 2000);
	});

	return flipContainer;
};

createCard(1);
