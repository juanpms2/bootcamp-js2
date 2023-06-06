import { elementReady } from "./helpers";
import { board } from "./model";
import { CardComponent } from "../components/card.component";
import {
	canBeFlipped,
	checkMatch,
	startGame,
	resetToContinue,
	restartGame,
} from "./motor";

const startGameButton = elementReady("start-game");
const restartGameButton = elementReady("restart-game");
const boardContainer = elementReady("board-container");
const gridContainer = elementReady("grid-container");
const counter = elementReady("scoreboard");

export const loadApp = () => {
	restartGameButton?.setAttribute("disabled", "true");

	const handleCheckMatch = (index: number) => {
		const isMatch = checkMatch(index);
		if (!isMatch) {
			setTimeout(() => {
				document
					.querySelector(`[data-index-array="${board.indexCardFlipA}"]`)
					?.classList.remove("flip");
				document
					.querySelector(`[data-index-array="${board.indexCardFlipB}"]`)
					?.classList.remove("flip");
				resetToContinue();
			}, 1000);
		}
	};

	let counterValue = 0;
	const handleFlip = (index: number) => {
		const flip = canBeFlipped(index);

		if (flip) {
			document
				.querySelector(`[data-index-array="${index}"]`)
				?.classList.add("flip");
			if (board.statusGame === "DosCartasLevantadas") {
				counter.innerHTML = ++counterValue + " intentos";
				handleCheckMatch(index);
			}
		} else {
			if (
				board.cardList[index].isFlipped &&
				board.statusGame !== "PartidaCompleta"
			) {
				alert("No se puede voltear la carta");
			}
			if (board.statusGame === "PartidaCompleta") {
				alert("La partida ha terminado");
			}
		}
	};

	const createGrid = () => {
		gridContainer?.querySelectorAll("*").forEach((element) => element.remove());
		boardContainer?.appendChild(gridContainer);
		gridContainer?.classList.add("board");

		board.cardList.map((item) => {
			const index = board.cardList.indexOf(item);
			const imageUrl = board.cardList[index].card.imageUrl;
			const cardElement = CardComponent({ imageUrl, index });
			cardElement.addEventListener("click", () => {
				handleFlip(index);
			});
			gridContainer?.appendChild(cardElement);
		});
	};

	const onStartGame = () => {
		startGame();
		createGrid();
		startGameButton?.setAttribute("disabled", "true");
		restartGameButton?.removeAttribute("disabled");
	};

	const onRestartGame = () => {
		boardContainer?.removeChild(gridContainer);
		restartGame();
		createGrid();
	};

	startGameButton?.addEventListener("click", () => {
		onStartGame();
	});

	restartGameButton?.addEventListener("click", () => {
		onRestartGame();
	});
};
