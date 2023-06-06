import { elementReady } from "./helpers";
import { board } from "./model";
import { CardComponent } from "../components/card/card.component";
import {
	canBeFlipped,
	checkMatch,
	startGame,
	resetToContinue,
	restartGame,
} from "./motor";
import { defaultScoreboard, textCardTooltip, textScoreboard } from "./constans";
import { TooltipComponent } from "../components/tooltip/tooltip.componet";

const startGameButton = elementReady("start-game");
const restartGameButton = elementReady("restart-game");
const boardContainer = elementReady("board-container");
const gridContainer = elementReady("grid-container");
const scoreboard = elementReady("scoreboard");

export const loadApp = () => {
	restartGameButton?.setAttribute("disabled", "true");

	const handleCheckMatch = (index: number) => {
		const isMatch = checkMatch(index);
		if (!isMatch) {
			setTimeout(() => {
				document
					.querySelector(`[data-index-array="${board.indexCardFlipA}"]`)
					?.classList.remove("flip");
				document
					.querySelector(`[data-index-array="${board.indexCardFlipB}"]`)
					?.classList.remove("flip");
				resetToContinue();
			}, 1000);
		}
	};

	let counterValue = 0;

	const handleFlip = (card: HTMLElement, index: number) => {
		const flip = canBeFlipped(index);

		if (flip) {
			document
				.querySelector(`[data-index-array="${index}"]`)
				?.classList.add("flip");
			if (board.statusGame === "DosCartasLevantadas") {
				scoreboard.innerHTML = ++counterValue + textScoreboard;
				handleCheckMatch(index);
			}
		} else {
			if (
				board.cardList[index].isFlipped &&
				board.statusGame !== "PartidaCompleta"
			) {
				const tooltip = TooltipComponent(textCardTooltip);
				card?.appendChild(tooltip);
				setTimeout(() => {
					card?.removeChild(tooltip);
				}, 1000);
			}
		}
		if (board.statusGame === "PartidaCompleta") {
			const txt = `<h1>¡Has ganado!</h1> <p>Has completado el juego en ${counterValue} movimientos</p>`;
			const tooltip = TooltipComponent(txt);
			tooltip.classList.add("tooltip-win");
			boardContainer?.appendChild(tooltip);
			setTimeout(() => {
				boardContainer?.removeChild(tooltip);
			}, 5000);
		}
	};

	const createGrid = () => {
		gridContainer?.querySelectorAll("*").forEach((element) => element.remove());
		boardContainer?.appendChild(gridContainer);
		gridContainer?.classList.add("board");

		board.cardList.map((item) => {
			const index = board.cardList.indexOf(item);
			const imageUrl = board.cardList[index].card.imageUrl;
			const cardElement = CardComponent({ imageUrl, index });
			cardElement.addEventListener("click", () => {
				handleFlip(cardElement, index);
			});
			gridContainer?.appendChild(cardElement);
		});
	};

	const onStartGame = () => {
		startGame();
		createGrid();
		startGameButton?.setAttribute("disabled", "true");
		restartGameButton?.removeAttribute("disabled");
	};

	const onRestartGame = () => {
		scoreboard.innerHTML = defaultScoreboard;
		boardContainer?.removeChild(gridContainer);
		restartGame();
		createGrid();
	};

	startGameButton?.addEventListener("click", () => {
		onStartGame();
	});

	restartGameButton?.addEventListener("click", () => {
		onRestartGame();
	});
};
