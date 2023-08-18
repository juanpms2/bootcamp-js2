import { CharacterVm } from "./model";
import { CardComponent } from "./components";

const elementInDOM = (id: string) => document.getElementById(id);

export const elementReady = (id: string) => {
    const element = elementInDOM(id);
    if (element && element instanceof HTMLElement) {
        return element;
    }
    console.log(new Error(`Element with id ${id} not found in DOM`));
    return null;
};

export const removeElement = (element: Element, child: Element) => {
    element?.removeChild(child);
};

export const createCardList = (cardList: CharacterVm[]) => {
    const mainContainer = elementReady("main-container");
    const cardContainerInDom = elementReady("card-container");
    if (!mainContainer || !cardContainerInDom) return;
    removeElement(mainContainer, cardContainerInDom);
    const cardContainer: HTMLDivElement = document.createElement("div");
    cardContainer.setAttribute("id", "card-container");
    mainContainer?.appendChild(cardContainer);
    cardList?.map((card) => cardContainer?.appendChild(CardComponent(card)));
};
