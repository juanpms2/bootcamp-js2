import { elementReady, loadCharacters } from "./helpers";
import { mapCharactersListFromApiToCardListProps } from "./mappers";
import { CardComponent, FilterComponent } from "./components";

const mainContainer = elementReady("main-container");

export const loadApp = async () => {
    const characters = await loadCharacters();
    const cardList = mapCharactersListFromApiToCardListProps(characters);
    const input: HTMLDivElement = FilterComponent();
    mainContainer?.appendChild(input);
    const cardContainer: HTMLDivElement = document.createElement("div");
    cardContainer.setAttribute("class", "card-container");
    mainContainer?.appendChild(cardContainer);
    cardList.map((card) => {
        const cardComponent = CardComponent(card);
        cardContainer?.appendChild(cardComponent);
    });
};
