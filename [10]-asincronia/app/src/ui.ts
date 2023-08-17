import { elementReady, loadCharacters } from "./helpers";
import { CardComponent, InputComponent } from "./components";

const mainContainer = elementReady("main-container");

export const loadApp = async () => {
    const card: HTMLDivElement = CardComponent();
    const input: HTMLDivElement = InputComponent();
    mainContainer?.appendChild(input);
    mainContainer?.appendChild(card);
    const characters = await loadCharacters();
    console.log(characters);
};
