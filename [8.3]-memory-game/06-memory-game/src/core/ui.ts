import { elementReady } from "./helpers";
import { CardComponent, TooltipComponent } from "../components";
import {
  checkMatch,
  startGame,
  // resetToContinue,
  getBoard,
  // resetGame,
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
} from "./motor";
import { defaultScoreboard, textCardTooltip, textScoreboard } from "./constans";
import { Board } from "./model";

const startGameButtonElement = elementReady("start-game");
const resetGameButtonElement = elementReady("reset-game");
const boardContainerElement = elementReady("board-container");
const gridContainerElement = elementReady("grid-container");
const scoreboardElement = elementReady("scoreboard");

export const loadApp = () => {
  const restoreToCardNotFlipped = (
    indexCardFlipA: number,
    indexCardFlipB: number
  ) => {
    setTimeout(() => {
      document
        .querySelector(`[data-index-array="${indexCardFlipA}"]`)
        ?.classList.remove("flip");
      document
        .querySelector(`[data-index-array="${indexCardFlipB}"]`)
        ?.classList.remove("flip");
    }, 1000);
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

  const displayGameResultTooltip = (moves: number): void => {
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

  const checkGameFinished = (board: Board) => {
    const isFinished = isGameFinished(board.cardList);

    if (isFinished) {
      markGameToFinished();
      displayGameResultTooltip(board.moves);
    }
  };

  const handleUpdateMoves = (board: Board): void => {
    if (board.statusGame === "UnaCartaLevantada") {
      scoreboardElement.innerHTML = board.moves + textScoreboard;
    }
  };

  const handleCheckMatch = (indexCardB: number): void => {
    const isMatch = checkMatch(indexCardB);

    if (isMatch) {
      console.log("es match");
      markSelectedPairCardAsMatched(indexCardB);
      updateMoves();
      checkGameFinished(getBoard());
    } else {
      console.log("no es match");
      updateStatusGame(indexCardB);
      resetSelectedPairCardsEngine(indexCardB);
      restoreToCardNotFlipped(getCardAIndex(), indexCardB);
      resetFlippedCards(getBoard());
    }
    handleUpdateMoves(getBoard());
  };

  const handleSecondFlip = (cardIndex: number): void => {
    console.log("handleSecondFlip");
    if (getStatusGame() === "DosCartasLevantadas") {
      handleCheckMatch(cardIndex);
    }
  };

  const handleFlip = (cardIndex: number): void => {
    const flip = canBeFlippedByIndex(cardIndex);

    if (flip) {
      flipCard(cardIndex);
      document
        .querySelector(`[data-index-array="${cardIndex}"]`)
        ?.classList.add("flip");

      updateStatusGame(cardIndex);
      handleSecondFlip(cardIndex);
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
    // resetGame();
    onStartGame();
  });
};
