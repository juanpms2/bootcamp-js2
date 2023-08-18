import { elementReady, loadCharacters } from "./helpers";
import { FilterComponent } from "./components";

const mainContainer = elementReady("main-container");

export const loadApp = async () => {
    const characters = await loadCharacters();
    console.log(characters);
    // const card: HTMLDivElement = CardComponent();
    const input: HTMLDivElement = FilterComponent();
    mainContainer?.appendChild(input);
};
