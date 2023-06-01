import { elementReady } from "./helpers";

const startGameButton = elementReady("start-game");

export const loadApp = () => {
	startGameButton?.addEventListener("click", () => {
		console.log("Start game");
	});
};
