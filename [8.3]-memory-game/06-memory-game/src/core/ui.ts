import { elementReady, removeElement } from "./helpers";
import { CardComponent, TooltipComponent } from "../components";
import {
	checkMatch,
	startGame,
	getBoard,
	flipCard,
	isGameFinished,
	resetSelectedPairCardsEngine,
	markSelectedPairCardAsMatched,
	markGameToFinished,
	updateStatusGame,
	updateMoves,
	// resetFlippedCards,
	getCardAIndex,
	getStatusGame,
	canBeFlippedByIndex,
	getCardBIndex,
	getMoves,
	resetGame,
	isCardFlippedByIndex,
} from "./motor";
import { defaultScoreboard, textCardTooltip, textScoreboard } from "./constans";

const startGameButtonElement = elementReady("start-game");
const resetGameButtonElement = elementReady("reset-game");
const boardContainerElement = elementReady("board-container");
const gridContainerElement = elementReady("grid-container");
const scoreboardElement = elementReady("scoreboard");

export const loadApp = () => {
	const restoreToCardNotFlipped = () => {
		const cardAIndex = getCardAIndex();
		const cardBIndex = getCardBIndex();
		const cardA = document.querySelector(`[data-index-array="${cardAIndex}"]`);
		const cardB = document.querySelector(`[data-index-array="${cardBIndex}"]`);

		cardA?.classList.remove("flip");
		cardB?.classList.remove("flip");

		if (cardA?.querySelector(".tooltip")) {
			removeElement(cardA, cardA?.querySelector(".tooltip"));
		}

		if (cardB?.querySelector(".tooltip")) {
			removeElement(cardB, cardB?.querySelector(".tooltip"));
		}
	};

	const displayCardTooltip = (cardIndex: number): void => {
		const tooltip = TooltipComponent(textCardTooltip);
		const card = document.querySelector(`[data-index-array="${cardIndex}"]`);
		card?.appendChild(tooltip);

		setTimeout(() => {
			removeElement(card, tooltip);
		}, 2000);
	};

	const displayGameResultTooltip = (): void => {
		const moves = getMoves();
		const txt = `<h1>¡Has ganado!</h1> <p>Has completado el juego en ${moves.toString()} movimientos</p>`;
		const tooltip = TooltipComponent(txt);
		tooltip.classList.add("tooltip-win");
		boardContainerElement?.appendChild(tooltip);
		setTimeout(() => {
			removeElement(boardContainerElement, tooltip);
		}, 5000);
	};

	const removeGameResultTooltip = (): void => {
		const tooltipResult = document.querySelector(".tooltip-win");
		tooltipResult && boardContainerElement?.removeChild(tooltipResult);
	};

	const checkGameFinished = () => {
		const isFinished = isGameFinished();

		if (isFinished) {
			markGameToFinished();
			displayGameResultTooltip();
		}
	};

	const displayCurrentScore = (): void => {
		scoreboardElement.innerHTML = getMoves() + textScoreboard;
	};

	const handleCheckMatch = (): void => {
		const isMatch = checkMatch();

		updateMoves();
		if (isMatch) {
			markSelectedPairCardAsMatched();
			checkGameFinished();
		} else {
			setTimeout(() => {
				restoreToCardNotFlipped();
				resetSelectedPairCardsEngine();
			}, 1000);
		}
		displayCurrentScore();
	};

	const handleFlip = (cardIndex: number): void => {
		const flip = canBeFlippedByIndex(cardIndex);

		if (flip) {
			flipCard(cardIndex);
			document
				.querySelector(`[data-index-array="${cardIndex}"]`)
				?.classList.add("flip");

			updateStatusGame(cardIndex);

			if (getStatusGame() === "DosCartasLevantadas") {
				handleCheckMatch();
			}
		} else {
			const isFlipped = isCardFlippedByIndex(cardIndex);
			if (isFlipped) {
				displayCardTooltip(cardIndex);
			}
		}
	};

	const createCardList = (): void => {
		const board = getBoard();

		board.cardList?.map((item) => {
			const cardIndex = board.cardList?.indexOf(item);
			const imageUrl = board.cardList[cardIndex].card?.imageUrl;
			const cardElement = CardComponent({ imageUrl, indexCard: cardIndex });

			cardElement.addEventListener("click", () => {
				handleFlip(cardIndex);
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
