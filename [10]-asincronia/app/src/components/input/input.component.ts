import { filterByName } from "../../bussines";

export const FilterComponent = () => {
    const container: HTMLDivElement = document.createElement("div");
    container.setAttribute("class", "filter-container");
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("class", "filter__input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search");
    const button: HTMLButtonElement = document.createElement("button");
    button.setAttribute("class", "filter__button");
    button.addEventListener("click", () => filterByName(input.value));
    button.innerHTML = "Search";
    input.appendChild(button);

    container.appendChild(input);
    container.appendChild(button);
    return container;
};
