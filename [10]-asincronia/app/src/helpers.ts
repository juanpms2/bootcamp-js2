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
    const cardContainerInDom = elementReady("card-container");
    if (cardContainerInDom) {
        cardContainerInDom.innerHTML = "";
        cardList?.map((card) =>
            cardContainerInDom?.appendChild(CardComponent(card))
        );
    }
};
