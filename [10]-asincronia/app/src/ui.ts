import { elementReady, createCardList } from "./helpers";
import { FilterComponent } from "./components";
import { loadCharacters, getCharactersList } from "./bussines";

const mainContainer = elementReady("main-container");

export const loadApp = async () => {
    await loadCharacters();
    const cardList = getCharactersList();
    const input: HTMLDivElement = FilterComponent();
    mainContainer?.appendChild(input);
    const cardContainer: HTMLDivElement = document.createElement("div");
    cardContainer.setAttribute("id", "card-container");
    mainContainer?.appendChild(cardContainer);
    // cardList.map((card) => cardContainer?.appendChild(CardComponent(card)));
    createCardList(cardList);
};
