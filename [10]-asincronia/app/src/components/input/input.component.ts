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
    filterButton.textContent = "Search";
    input.appendChild(filterButton);

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            filterByName(input.value);
        }
    });

    container.appendChild(input);
    container.appendChild(filterButton);
    return container;
};
