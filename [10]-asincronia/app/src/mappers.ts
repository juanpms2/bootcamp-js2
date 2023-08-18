import { Character } from "./model";
import { CardProps } from "./components";
import { API_URL } from "./constants";

const mapCharacterFromApiToCardProps = (character: Character): CardProps => ({
    name: character.nombre,
    speciality: character.especialidad,
    skills: character.habilidades,
    imageUrl: `${API_URL}/${character.imagen}`,
});

export const mapCharactersListFromApiToCardListProps = (
    characters: Character[]
): CardProps[] => {
    return characters.map(mapCharacterFromApiToCardProps);
};
