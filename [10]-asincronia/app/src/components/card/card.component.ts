import { CardProps } from "./card.model";

export const CardComponent = (props: CardProps) => {
    console.log("CardComponent", props);
    const { name, speciality, skills, imageUrl } = props;
    const card: HTMLDivElement = document.createElement("div");
    card.setAttribute("class", "card");
    const image: HTMLImageElement = document.createElement("img");
    image.setAttribute("class", "card__image");
    image.setAttribute("src", imageUrl);
    image.setAttribute("alt", name);
    const nameItem: HTMLDivElement = document.createElement("div");
    nameItem.innerHTML = `<b>Nombre:</b> ${name}`;
    const specialityItem: HTMLDivElement = document.createElement("div");
    specialityItem.innerHTML = `<b>Especialidad:</b> ${speciality}`;
    const skillsItem: HTMLDivElement = document.createElement("div");
    skillsItem.innerHTML = `<b>Habilidades:</b> ${skills.join(", ")}`;
    const footer: HTMLDivElement = document.createElement("div");
    footer.setAttribute("class", "card__footer");
    footer?.appendChild(nameItem);
    footer?.appendChild(specialityItem);
    footer?.appendChild(skillsItem);

    card?.appendChild(image);
    card?.appendChild(footer);

    return card;
};
