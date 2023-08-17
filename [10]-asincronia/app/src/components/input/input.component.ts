export const InputComponent = () => {
    const input: HTMLInputElement = document.createElement("input");
    input.setAttribute("class", "input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search");
    return input;
};
