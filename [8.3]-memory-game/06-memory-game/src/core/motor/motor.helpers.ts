import { Board, Card, StatusGame } from "../model";

export const updateStatusGameHelper = (
	cardIndex: number,
	board: Board
): Board => {
	switch (board?.statusGame) {
		case "CeroCartasLevantadas":
			return {
				...board,
				statusGame: "UnaCartaLevantada",
				indexCardFlipA: cardIndex,
			};

		case "UnaCartaLevantada":
			return {
				...board,
				statusGame: "DosCartasLevantadas",
				indexCardFlipB: cardIndex,
			};

		case "DosCartasLevantadas":
			return {
				...board,
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
			};

		default:
			return board;
	}
};

export const canBeFlippedHelper = (
	card: Card,
	statusGame: StatusGame
): boolean =>
	card?.isFlipped || statusGame === "DosCartasLevantadas" ? false : true;

export const flipCardHelper = (index: number, board: Board): Board => {
	const cardList = board.cardList?.map((card, i) =>
		i === index ? { ...card, isFlipped: true } : card
	);

	return cardList
		? {
				...board,
				cardList,
		  }
		: board;
};

export const markSelectedPairCardAsMatchedHelper = (board: Board): Board => {
	const cardList = board.cardList?.map((card, i) =>
		i === board.indexCardFlipA || i === board.indexCardFlipB
			? { ...card, isFound: true }
			: card
	);

	return {
		...board,
		cardList,
		statusGame: "CeroCartasLevantadas",
		indexCardFlipA: null,
		indexCardFlipB: null,
	};
};

export const resetSelectedPairCardsEngineHelper = (board: Board): Board => {
	const cardList = board.cardList?.map((card, i) =>
		i === board.indexCardFlipA || i === board.indexCardFlipB
			? { ...card, isFlipped: false }
			: card
	);
	return {
		...board,
		cardList,
		statusGame: "CeroCartasLevantadas",
		indexCardFlipA: null,
		indexCardFlipB: null,
	};
};

export const updateMovesHelper = (board: Board): Board => {
	return { ...board, moves: board.moves + 1 };
};
