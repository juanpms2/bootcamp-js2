import { CharacterVm } from "../../model";

export const CardComponent = (props: CharacterVm) => {
    const { nombre, especialidad, habilidades, imagen } = props;
    const card: HTMLDivElement = document.createElement("div");
    card.setAttribute("class", "card");
    const image: HTMLImageElement = document.createElement("img");
    image.setAttribute("class", "card__image");
    image.setAttribute("src", imagen);
    image.setAttribute("alt", nombre);
    const nameItem: HTMLDivElement = document.createElement("div");
    nameItem.innerHTML = `<b>Nombre:</b> ${nombre}`;
    const specialityItem: HTMLDivElement = document.createElement("div");
    specialityItem.innerHTML = `<b>Especialidad:</b> ${especialidad}`;
    const skillsItem: HTMLDivElement = document.createElement("div");
    skillsItem.innerHTML = `<b>Habilidades:</b> ${habilidades.join(", ")}`;
    const footer: HTMLDivElement = document.createElement("div");
    footer.setAttribute("class", "card__footer");
    footer?.appendChild(nameItem);
    footer?.appendChild(specialityItem);
    footer?.appendChild(skillsItem);

    card?.appendChild(image);
    card?.appendChild(footer);

    return card;
};
