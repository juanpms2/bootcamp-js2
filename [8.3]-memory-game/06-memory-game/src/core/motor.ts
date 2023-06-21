import { cardListData } from "./data";
import { Card, Board, createDefaultBoard, statusGame } from "./model";

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

export const canBeFlipped = (card: Card, statusGame: statusGame): boolean =>
  card?.isFlipped || statusGame === "DosCartasLevantadas" ? false : true;

export const flipCard = (index: number, board: Board): void => {
  const cardList = board.cardList?.map((card, i) =>
    i === index ? { ...card, isFlipped: true } : card
  );
  setBoard({
    ...board,
    cardList,
  });
};

export const updateStatusGame = (cardIndex: number, board: Board): void => {
  switch (board.statusGame) {
    case "CeroCartasLevantadas":
      setBoard({
        ...board,
        statusGame: "UnaCartaLevantada",
        indexCardFlipA: cardIndex,
      });
      break;
    case "UnaCartaLevantada":
      setBoard({
        ...board,
        statusGame: "DosCartasLevantadas",
        indexCardFlipB: cardIndex,
      });
      break;
    case "DosCartasLevantadas":
      setBoard({
        ...board,
        statusGame: "CeroCartasLevantadas",
        indexCardFlipA: null,
        indexCardFlipB: null,
      });
      break;
    default:
      break;
  }
};

export const checkMatch = (indexCardB: number, board: Board): boolean =>
  board.cardList[board.indexCardFlipA].card?.id ===
  board.cardList[indexCardB].card?.id
    ? true
    : false;

export const markSelectedPairCardAsMatched = (
  indexCardB: number,
  board: Board
): void => {
  const list = board.cardList.map((card, i) =>
    i === indexCardB || i === board.indexCardFlipA
      ? { ...card, isFound: true }
      : card
  );
  setBoard({
    ...board,
    cardList: list,
  });
};

export const resetSelectedPairCardsEngine = (
  indexCardB: number,
  board: Board
): void => {
  const list = board.cardList.map((card, i) =>
    i === indexCardB || i === board.indexCardFlipA
      ? { ...card, isFlipped: false }
      : card
  );
  setBoard({ ...board, cardList: list });
};

export const updateMoves = (board: Board): void => {
  setBoard({ ...board, moves: board.moves + 1 });
};

export const isGameFinished = (cardList: Card[]): boolean =>
  cardList.every((card) => card.isFound);

export const markGameToFinished = (board: Board): void => {
  setBoard({ ...board, statusGame: "PartidaCompleta" });
};

export const startGame = (): void => {
  const board = getBoard();
  setBoard({
    ...board,
    cardList: shuffleCards(board.cardList),
    statusGame: "CeroCartasLevantadas",
  });
};

// export const resetGame = (): void => {
// 	setBoard(createDefaultBoard(cardListData));
// };

export const resetFlippedCards = (board: Board): void => {
  setBoard({
    ...board,
    indexCardFlipA: null,
    indexCardFlipB: null,
  });
};
