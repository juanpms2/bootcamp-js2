import { elementReady } from "./helpers";
import { findImages } from "./business";

document.addEventListener("DOMContentLoaded", () => {
    const containerElement = elementReady("images-container", HTMLDivElement);
    const textElement = elementReady("text", HTMLTextAreaElement);
    const buttonElement = elementReady("button", HTMLButtonElement);

    buttonElement.onclick = () => {
        const images = findImages(textElement.value);
        containerElement.textContent = "";
        for (const image of images) {
            const img = document.createElement("img");
            img.src = image;
            containerElement.appendChild(img);
        }
    };
});
