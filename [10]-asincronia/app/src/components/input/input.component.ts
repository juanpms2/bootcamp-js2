import { filterByName } from "../../bussines";
import { CharacterVm } from "../../model";

export const FilterComponent = (charactersList: CharacterVm[]) => {
    const container: HTMLDivElement = document.createElement("div");
    container.setAttribute("class", "filter-container");
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("class", "filter__input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search");
    const filterButton: HTMLButtonElement = document.createElement("button");
    filterButton.setAttribute("class", "filter__button");
    filterButton.addEventListener("click", () =>
        filterByName(charactersList, input.value)
    );
    filterButton.innerHTML = "Search";
    input.appendChild(filterButton);

    container.appendChild(input);
    container.appendChild(filterButton);
    return container;
};
