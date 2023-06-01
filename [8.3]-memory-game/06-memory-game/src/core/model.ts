import { cardList } from "./data";
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

// export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
  Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
  EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
*/

type statusGame =
	| "PartidaNoIniciada"
	| "CeroCartasLevantadas"
	| "UnaCartaLevantada"
	| "DosCartasLevantadas"
	| "PartidaCompleta";

export interface Board {
	cardList: Card[];
	estadoPartida: statusGame;
	indiceCartaVolteadaA?: number;
	indiceCartaVolteadaB?: number;
}

export const createDefaultBoard = (): Board => ({
	cardList: createDefaultCardList(cardList),
	estadoPartida: "PartidaNoIniciada",
});

// export let tablero: Board = createDefaultBoard();
