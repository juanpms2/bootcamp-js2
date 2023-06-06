import { cardListData } from "./data";
export interface CardInfo {
	id: number;
	imageUrl: string;
}
export interface Card {
	card: CardInfo;
	isFlipped: boolean;
	isFound: boolean;
}

export const createDefaultCard = (card: CardInfo): Card => ({
	card,
	isFlipped: false,
	isFound: false,
});

export const createDefaultCardList = (cardList: CardInfo[]): Card[] => {
	const listOne = cardList.map((card) => createDefaultCard(card));
	const listTwo = cardList.map((card) => createDefaultCard(card));
	return [...listOne, ...listTwo];
};

export let cardList: Card[] = createDefaultCardList(cardListData);

type statusGame =
	| "PartidaNoIniciada"
	| "CeroCartasLevantadas"
	| "UnaCartaLevantada"
	| "DosCartasLevantadas"
	| "PartidaCompleta";

export interface Board {
	cardList: Card[];
	statusGame: statusGame;
	indexCardFlipA?: number;
	indexCardFlipB?: number;
}

export const createDefaultBoard = (): Board => ({
	cardList: cardList,
	statusGame: "PartidaNoIniciada",
});

export let board: Board = createDefaultBoard();
