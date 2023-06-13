import { elementReady } from "./helpers";
import { CardComponent, TooltipComponent } from "../components";
import {
	canBeFlipped,
	checkMatch,
	startGame,
	resetToContinue,
	getBoard,
	resetGame,
	setBoard,
} from "./motor";
import { defaultScoreboard, textCardTooltip, textScoreboard } from "./constans";

const startGameButtonElement = elementReady("start-game");
const resetGameButtonElement = elementReady("reset-game");
const boardContainerElement = elementReady("board-container");
const gridContainerElement = elementReady("grid-container");
const scoreboardElement = elementReady("scoreboard");

export const loadApp = () => {
	const restoreToCardNotFlipped = () => {
		const board = getBoard();

		setTimeout(() => {
			document
				.querySelector(`[data-index-array="${board.indexCardFlipA}"]`)
				?.classList.remove("flip");
			document
				.querySelector(`[data-index-array="${board.indexCardFlipB}"]`)
				?.classList.remove("flip");
			resetToContinue();
		}, 1000);
	};
	const handleCheckMatch = (index: number) => {
		const isMatch = checkMatch(index);

		if (!isMatch) {
			restoreToCardNotFlipped();
		}
	};

	const displayCardTooltip = (index: number): void => {
		const tooltip = TooltipComponent(textCardTooltip);
		const card = document.querySelector(`[data-index-array="${index}"]`);
		card?.appendChild(tooltip);
		setTimeout(() => {
			card?.removeChild(tooltip);
		}, 2000);
	};

	const cardIsFlipped = (index: number): void => {
		const board = getBoard();

		if (
			board.cardList[index]?.isFlipped &&
			board.statusGame !== "PartidaCompleta"
		) {
			displayCardTooltip(index);
		}
	};

	const displayGameResultTooltip = (moves: number): void => {
		const txt = `<h1>¡Has ganado!</h1> <p>Has completado el juego en ${moves.toString()} movimientos</p>`;
		const tooltip = TooltipComponent(txt);
		tooltip.classList.add("tooltip-win");
		boardContainerElement?.appendChild(tooltip);
		setTimeout(() => {
			boardContainerElement?.removeChild(tooltip);
		}, 5000);
	};

	const removeGameResultTooltip = (): void => {
		const tooltipResult = document.querySelector(".tooltip-win");
		boardContainerElement?.removeChild(tooltipResult);
	};

	const gameIsFinished = () => {
		const board = getBoard();

		if (board.statusGame === "PartidaCompleta") {
			displayGameResultTooltip(board.moves);
		}
	};

	const isSecondCard = (index: number): void => {
		const board = getBoard();

		if (board.statusGame === "DosCartasLevantadas") {
			setBoard({ moves: board.moves + 1 });
			scoreboardElement.innerHTML = board.moves + 1 + textScoreboard;
			handleCheckMatch(index);
		}
	};

	const handleFlip = (index: number): void => {
		const flip = canBeFlipped(index);

		if (flip) {
			document
				.querySelector(`[data-index-array="${index}"]`)
				?.classList.add("flip");
			isSecondCard(index);
		} else {
			cardIsFlipped(index);
		}
		gameIsFinished();
	};

	const createCardList = (): void => {
		const board = getBoard();

		board.cardList?.map((item) => {
			const index = board.cardList?.indexOf(item);
			const imageUrl = board.cardList[index].card?.imageUrl;
			const cardElement = CardComponent({ imageUrl, index });

			cardElement.addEventListener("click", () => {
				handleFlip(index);
			});

			gridContainerElement?.appendChild(cardElement);
		});
	};

	const createGrid = () => {
		scoreboardElement.innerHTML = defaultScoreboard;
		gridContainerElement
			?.querySelectorAll("*")
			.forEach((element) => element.remove());
		boardContainerElement?.appendChild(gridContainerElement);
		gridContainerElement?.classList.add("board");

		createCardList();
	};

	const onStartGame = () => {
		startGameButtonElement?.setAttribute("disabled", "true");
		resetGameButtonElement?.removeAttribute("disabled");
		startGame();
		createGrid();
	};

	startGameButtonElement?.addEventListener("click", () => {
		onStartGame();
	});

	resetGameButtonElement?.addEventListener("click", () => {
		removeGameResultTooltip();
		resetGame();
		onStartGame();
	});
};
