import { filterByName } from "../../bussines";

export const FilterComponent = () => {
    const container: HTMLDivElement = document.createElement("div");
    container.setAttribute("class", "filter-container");
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("class", "filter__input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search");
    const filterButton: HTMLButtonElement = document.createElement("button");
    filterButton.setAttribute("class", "filter__button");
    filterButton.addEventListener("click", () => filterByName(input.value));
    filterButton.innerHTML = "Search";
    input.appendChild(filterButton);

    container.appendChild(input);
    container.appendChild(filterButton);
    return container;
};
