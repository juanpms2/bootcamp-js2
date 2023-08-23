import { API_URL } from "../../constants";
import { CharacterModel } from "../../model";

export const CardComponent = (props: CharacterModel) => {
    const { nombre, especialidad, habilidades, imagen } = props;
    const card: HTMLDivElement = document.createElement("div");
    card.setAttribute("class", "card");
    const image: HTMLImageElement = document.createElement("img");
    image.setAttribute("class", "card__image");
    image.setAttribute("src", `${API_URL}/${imagen}`);
    image.setAttribute("alt", nombre);
    const nameItem: HTMLDivElement = document.createElement("div");
    const boldElementName = document.createElement("b");
    boldElementName.textContent = "Nombre: ";
    nameItem.appendChild(boldElementName);
    nameItem.appendChild(document.createTextNode(nombre));
    const specialityItem: HTMLDivElement = document.createElement("div");
    const boldElementSpeciality = document.createElement("b");
    boldElementSpeciality.textContent = "Especialidad: ";
    specialityItem.appendChild(boldElementSpeciality);
    specialityItem.appendChild(document.createTextNode(especialidad));
    const skillsItem: HTMLDivElement = document.createElement("div");
    const boldElementSkills = document.createElement("b");
    boldElementSkills.textContent = "Habilidades: ";
    skillsItem.appendChild(boldElementSkills);
    skillsItem.appendChild(document.createTextNode(habilidades.join(", ")));
    const footer: HTMLDivElement = document.createElement("div");
    footer.setAttribute("class", "card__footer");
    footer.appendChild(nameItem);
    footer.appendChild(specialityItem);
    footer.appendChild(skillsItem);

    card.appendChild(image);
    card.appendChild(footer);

    return card;
};
