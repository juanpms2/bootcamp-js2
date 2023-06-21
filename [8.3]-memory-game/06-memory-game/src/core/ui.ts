import { elementReady } from "./helpers";
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
	resetFlippedCards,
	getCardAIndex,
	getStatusGame,
	canBeFlippedByIndex,
	isCardFlippedByIndex,
	getCardBIndex,
	getMoves,
	resetGame,
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

		document
			.querySelector(`[data-index-array="${cardAIndex}"]`)
			?.classList.remove("flip");
		document
			.querySelector(`[data-index-array="${cardBIndex}"]`)
			?.classList.remove("flip");
	};

	const displayCardTooltip = (cardIndex: number): void => {
		const tooltip = TooltipComponent(textCardTooltip);
		const card = document.querySelector(`[data-index-array="${cardIndex}"]`);
		card?.appendChild(tooltip);
		setTimeout(() => {
			card?.removeChild(tooltip);
		}, 2000);
	};

	const cardIsFlipped = (cardIndex: number, isFlipped: boolean): void => {
		if (isFlipped) {
			displayCardTooltip(cardIndex);
		}
	};

	const displayGameResultTooltip = (): void => {
		const moves = getMoves();
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
		const cardBIndex = getCardBIndex();

		updateMoves();
		if (isMatch) {
			markSelectedPairCardAsMatched();
			updateStatusGame(cardBIndex);
			checkGameFinished();
		} else {
			setTimeout(() => {
				restoreToCardNotFlipped();
				updateStatusGame(cardBIndex);
				resetFlippedCards();
			}, 1000);
			resetSelectedPairCardsEngine();
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
			cardIsFlipped(cardIndex, isCardFlippedByIndex(cardIndex));
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
