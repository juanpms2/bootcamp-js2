import { elementReady } from "./helpers";
import { Card, board } from "./model";
import {
	areMatch,
	canBeFlipped,
	flippedCard,
	gameFinished,
	matchFound,
	matchNotFound,
	startGame,
} from "./motor";

const startGameButton = elementReady("start-game");
const restartGameButton = elementReady("restart-game");

export const loadApp = () => {
	restartGameButton?.setAttribute("disabled", "true");

	const createCard = (index: number) => {
		const item: Card = board.cardList[index];
		const id = `card-${index}`;

		const flipContainer: HTMLDivElement = document.createElement("div");
		flipContainer.setAttribute("class", "flip-container");
		flipContainer.setAttribute("id", id);
		flipContainer.setAttribute("data-index-array", index.toString());

		const flipper: HTMLDivElement = document.createElement("div");
		flipper.setAttribute("class", "flipper");
		flipContainer.appendChild(flipper);

		const front: HTMLDivElement = document.createElement("div");
		front.setAttribute("class", "front");
		flipper.appendChild(front);

		const back: HTMLDivElement = document.createElement("div");
		back.setAttribute("class", "back");
		flipper.appendChild(back);

		const backImage: HTMLImageElement = document.createElement("img");
		backImage.setAttribute("src", item.card.imageUrl);
		backImage.setAttribute("data-index-img", index.toString());
		back.appendChild(backImage);

		flipContainer.addEventListener("click", () => {
			handleFlip(index);
		});

		return flipContainer;
	};

	const handleFlip = (index: number) => {
		const flip = canBeFlipped(board, index);

		if (flip) {
			flippedCard(board, index);
			document
				.querySelector(`[data-index-array="${index}"]`)
				?.classList.add("flip");
			if (board.statusGame === "CeroCartasLevantadas") {
				board.statusGame = "UnaCartaLevantada";
				board.indexCardFlipA = index;
				return;
			}
			if (board.statusGame === "UnaCartaLevantada") {
				board.statusGame = "DosCartasLevantadas";
				board.indexCardFlipB = index;
				const match = areMatch(board.indexCardFlipA, board.indexCardFlipB);
				if (match) {
					matchFound(board, board.indexCardFlipA, board.indexCardFlipB);
					const gameFinishedBool = gameFinished(board);
					if (gameFinishedBool) {
						board.statusGame = "PartidaCompleta";
					} else {
						board.statusGame = "CeroCartasLevantadas";
					}
				} else {
					matchNotFound(board, board.indexCardFlipA, board.indexCardFlipB);
					setTimeout(() => {
						document
							.querySelector(`[data-index-array="${board.indexCardFlipA}"]`)
							?.classList.remove("flip");
						document
							.querySelector(`[data-index-array="${board.indexCardFlipB}"]`)
							?.classList.remove("flip");
						board.statusGame = "CeroCartasLevantadas";
					}, 1000);
				}
			}
		} else {
			alert("No puedes voltear esta carta");
		}
	};

	const createGrid = () => {
		const root = document.querySelector("#game");
		const container = document.createElement("div");
		container?.setAttribute("id", "grid-container");
		root?.appendChild(container);

		board.cardList.map((card) => {
			const index = board.cardList.indexOf(card);
			const cardElement = createCard(index);
			container?.appendChild(cardElement);
		});
	};

	const onStartGame = () => {
		startGame();
		createGrid();
		startGameButton?.setAttribute("disabled", "true");
		restartGameButton?.removeAttribute("disabled");
	};

	const restartGame = () => {
		const root = document.querySelector("#game");
		const container = document.querySelector("#grid-container");
		root?.removeChild(container!);
		onStartGame();
	};

	startGameButton?.addEventListener("click", () => {
		onStartGame();
	});

	restartGameButton?.addEventListener("click", () => {
		restartGame();
	});
};
