import { Board, Card, board } from "./model";

export const shuffleCards = (cards: Card[]): Card[] => {
	// Fisher-Yates shuffle
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}
	console.log(cards);
	return cards;
};

export const canBeFlipped = (board: Board, index: number): boolean => {
	if (board.cardList[index].isFlipped) {
		return false;
	}
	if (board.statusGame === "CeroCartasLevantadas") {
		return true;
	}
	if (board.statusGame === "UnaCartaLevantada") {
		return true;
	}
	return false;
};

export const flippedCard = (board: Board, index: number): void => {
	board.cardList[index].isFlipped = true;
};

export const areMatch = (indexA: number, indexB: number): boolean =>
	board.cardList[indexA].card.id === board.cardList[indexB].card.id;

export const matchFound = (
	board: Board,
	indexA: number,
	indexB: number
): void => {
	board.cardList[indexA].isFound = true;
	board.cardList[indexB].isFound = true;
};

export const matchNotFound = (
	board: Board,
	indexA: number,
	indexB: number
): void => {
	board.cardList[indexA].isFlipped = false;
	board.cardList[indexB].isFlipped = false;
};

export const gameFinished = (board: Board): boolean => {
	return board.cardList.every((card) => card.isFound);
};

export const startGame = (): void => {
	board.cardList = shuffleCards(board.cardList);
	board.statusGame = "CeroCartasLevantadas";
};
