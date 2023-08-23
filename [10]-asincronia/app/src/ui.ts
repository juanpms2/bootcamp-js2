import { elementReady, createCardList } from "./helpers";
import { FilterComponent } from "./components";
import { loadCharacters } from "./bussines";

const mainContainer = elementReady("main-container", HTMLElement);

export const loadApp = async () => {
    const cardList = await loadCharacters();
    const input: HTMLDivElement = FilterComponent();
    mainContainer?.appendChild(input);
    const cardContainer: HTMLDivElement = document.createElement("div");
    cardContainer.setAttribute("id", "card-container");
    mainContainer?.appendChild(cardContainer);
    createCardList(cardList);
};
