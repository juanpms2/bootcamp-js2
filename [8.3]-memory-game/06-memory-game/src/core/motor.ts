import { Card, board } from "./model";

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
	if (board.cardList[index].isFlipped) {
		return false;
	}
	switch (board.statusGame) {
		case "CeroCartasLevantadas":
			flippedCard(index);
			board.statusGame = "UnaCartaLevantada";
			board.indexCardFlipA = index;
			return true;

		case "UnaCartaLevantada":
			flippedCard(index);
			board.statusGame = "DosCartasLevantadas";
			board.indexCardFlipB = index;

			return true;

		default:
			return false;
	}
};

export const flippedCard = (index: number): void => {
	board.cardList[index].isFlipped = true;
};

export const resetToContinue = (): void => {
	board.statusGame = "CeroCartasLevantadas";
	board.indexCardFlipA = null;
	board.indexCardFlipB = null;
};

export const checkMatch = (index: number): boolean =>
	board.cardList[board.indexCardFlipA]?.card.id ===
	board.cardList[index]?.card.id
		? matchFound(index)
		: matchNotFound(index);

export const matchFound = (index: number): boolean => {
	board.cardList[board.indexCardFlipA].isFound = true;
	board.cardList[index].isFound = true;

	const isFinished = isGameFinished();
	isFinished
		? (board.statusGame = "PartidaCompleta")
		: (board.statusGame = "CeroCartasLevantadas");

	return true;
};

export const matchNotFound = (index: number): boolean => {
	board.cardList[board.indexCardFlipA].isFlipped = false;
	board.cardList[index].isFlipped = false;

	return false;
};

export const isGameFinished = (): boolean => {
	return board.cardList.every((card) => card.isFound);
};

export const startGame = (): void => {
	board.cardList = shuffleCards(board.cardList);
	board.statusGame = "CeroCartasLevantadas";
};

export const restartGame = (): void => {
	board.cardList.map((card) => {
		card.isFlipped = false;
		card.isFound = false;
	});
	startGame();
};
