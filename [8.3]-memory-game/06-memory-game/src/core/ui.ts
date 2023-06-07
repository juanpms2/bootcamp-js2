import { elementReady } from "./helpers";
import { CardComponent, TooltipComponent } from "../components";
import {
	canBeFlipped,
	checkMatch,
	startGame,
	resetToContinue,
	restartGame,
	board,
} from "./motor";
import { defaultScoreboard, textCardTooltip, textScoreboard } from "./constans";

const startGameButton = elementReady("start-game");
const restartGameButton = elementReady("restart-game");
const boardContainer = elementReady("board-container");
const gridContainer = elementReady("grid-container");
const scoreboard = elementReady("scoreboard");
let counterValue = 0;

export const loadApp = () => {
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

	const cardIsFlipped = (card: HTMLElement, index: number): void => {
		if (
			board.cardList[index]?.isFlipped &&
			board.statusGame !== "PartidaCompleta"
		) {
			const tooltip = TooltipComponent(textCardTooltip);
			card?.appendChild(tooltip);
			setTimeout(() => {
				card?.removeChild(tooltip);
			}, 2000);
		}
	};

	const gameIsFinished = () => {
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

	const handleFlip = (card: HTMLElement, index: number): void => {
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
			cardIsFlipped(card, index);
		}
		gameIsFinished();
	};

	const createGrid = () => {
		scoreboard.innerHTML = defaultScoreboard;
		gridContainer?.querySelectorAll("*").forEach((element) => element.remove());
		boardContainer?.appendChild(gridContainer);
		gridContainer?.classList.add("board");

		board.cardList?.map((item) => {
			const index = board.cardList?.indexOf(item);
			const imageUrl = board.cardList[index].card?.imageUrl;
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
