import { getCharacters } from "./api";
import { Character } from "./model";
import { CHARACTERS_URL } from "./constants";

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

export const loadCharacters = async (): Promise<Character[]> => {
    const characters = await getCharacters(CHARACTERS_URL);

    return characters;
};
