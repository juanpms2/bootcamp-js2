import { cardListData } from "../data";
import { Card, Board, createDefaultBoard, StatusGame } from "../model";
import {
	canBeFlippedHelper,
	flipCardHelper,
	markSelectedPairCardAsMatchedHelper,
	resetSelectedPairCardsEngineHelper,
	updateMovesHelper,
	updateStatusGameHelper,
} from "./motor.helper";

let board: Board = createDefaultBoard(cardListData);
export const getBoard = (): Board => board;
export const setBoard = (newBoard: Board): Board => (board = newBoard);

export const shuffleCards = (cards: Card[]): Card[] => {
	if (cards) {
		// Fisher-Yates shuffle
		for (let i = cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = cards[i];
			cards[i] = cards[j];
			cards[j] = temp;
		}
		return cards;
	} else {
		return [];
	}
};

export const canBeFlippedByIndex = (index: number): boolean => {
	const card = getBoard().cardList[index];
	return canBeFlipped(card);
};

export const canBeFlipped = (card: Card): boolean =>
	canBeFlippedHelper(card, getBoard().statusGame);

export const flipCard = (index: number): void => {
	setBoard(flipCardHelper(index, getBoard()));
};

export const checkMatch = (): boolean => {
	const board = getBoard();

	return board.cardList[board.indexCardFlipA].card?.id ===
		board.cardList[board.indexCardFlipB].card?.id
		? true
		: false;
};

export const markSelectedPairCardAsMatched = (): void => {
	setBoard(markSelectedPairCardAsMatchedHelper(getBoard()));
};

export const resetSelectedPairCardsEngine = (): void => {
	setBoard(resetSelectedPairCardsEngineHelper(getBoard()));
};

export const updateMoves = (): void => {
	setBoard(updateMovesHelper(getBoard()));
};

export const isGameFinished = (cardList: Card[]): boolean =>
	cardList.every((card) => card.isFound);

export const markGameToFinished = (): void => {
	setBoard({ ...getBoard(), statusGame: "PartidaCompleta" });
};

export const startGame = (): void => {
	const board = getBoard();
	setBoard({
		...board,
		cardList: shuffleCards(board.cardList),
		statusGame: "CeroCartasLevantadas",
	});
};

export const updateStatusGame = (cardIndex: number) => {
	setBoard(updateStatusGameHelper(cardIndex, getBoard()));
};

export const resetFlippedCards = (): void => {
	setBoard({
		...getBoard(),
		indexCardFlipA: null,
		indexCardFlipB: null,
	});
};

export const isCardFlippedByIndex = (index: number): boolean =>
	getCardAtAGivenIndex(index).isFlipped;

export const getCardAtAGivenIndex = (index: number): Card =>
	getBoard().cardList[index];

export const getCardAIndex = (): number => getBoard().indexCardFlipA;

export const getCardBIndex = (): number => getBoard().indexCardFlipB;

export const getStatusGame = (): StatusGame => getBoard().statusGame;
