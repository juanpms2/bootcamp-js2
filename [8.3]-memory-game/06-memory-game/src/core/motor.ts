import { cardListData } from "./data";
import { Card, Board, createDefaultBoard } from "./model";
import { gameStateManagement } from "./helpers";

export const [getBoard, setBoard] = gameStateManagement<Board>(
	createDefaultBoard(cardListData)
);

export const shuffleCards = (cards: Card[]): Card[] => {
	// Fisher-Yates shuffle
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}

	return cards;
};

export const canBeFlipped = (index: number): boolean => {
	const board = getBoard();
	if (board.cardList[index].isFlipped) {
		return false;
	}
	switch (board.statusGame) {
		case "CeroCartasLevantadas":
			flippedCard(index);
			setBoard({
				statusGame: "UnaCartaLevantada",
				indexCardFlipA: index,
			});
			return true;

		case "UnaCartaLevantada":
			flippedCard(index);
			setBoard({
				statusGame: "DosCartasLevantadas",
				indexCardFlipB: index,
			});
			return true;

		default:
			return false;
	}
};

export const flippedCard = (index: number): void => {
	const board = getBoard();
	setBoard({
		cardList: board.cardList.map((card, i) =>
			i === index ? { ...card, isFlipped: true } : card
		),
	});
};

export const resetToContinue = (): void => {
	setBoard({
		statusGame: "CeroCartasLevantadas",
		indexCardFlipA: null,
		indexCardFlipB: null,
	});
};

export const checkMatch = (index: number): boolean => {
	const board = getBoard();
	return board.cardList[board.indexCardFlipA]?.card.id ===
		board.cardList[index]?.card.id
		? matchFound(index)
		: matchNotFound(index);
};

export const matchFound = (index: number): boolean => {
	const board = getBoard();
	setBoard({
		cardList: board.cardList.map((card, i) =>
			i === index || i === board.indexCardFlipA
				? { ...card, isFound: true }
				: card
		),
	});

	const isFinished = isGameFinished();
	isFinished ? setBoard({ statusGame: "PartidaCompleta" }) : resetToContinue();

	return true;
};

export const matchNotFound = (index: number): boolean => {
	const board = getBoard();
	setBoard({
		cardList: board.cardList.map((card, i) =>
			i === index || i === board.indexCardFlipA
				? { ...card, isFlipped: false }
				: card
		),
	});

	return false;
};

export const isGameFinished = (): boolean => {
	const board = getBoard();
	return board.cardList.every((card) => card.isFound);
};

export const startGame = (): void => {
	const board = getBoard();
	setBoard({
		cardList: shuffleCards(board.cardList),
		statusGame: "CeroCartasLevantadas",
	});
};

export const resetGame = (): void => {
	setBoard(createDefaultBoard(cardListData));
};
