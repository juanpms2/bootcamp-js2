import { CharacterApiModel, CharacterVm } from "./model";
import { API_URL } from "./constants";

const mapCharacterFromApiToCardProps = (
    character: CharacterApiModel
): CharacterVm => ({
    nombre: character?.nombre || "",
    especialidad: character?.especialidad || "",
    habilidades: character?.habilidades || [],
    imagen: `${API_URL}/${character?.imagen}`,
});

export const mapCharactersListFromApiToCardListProps = (
    characters: CharacterApiModel[]
): CharacterVm[] => {
    return characters.map(mapCharacterFromApiToCardProps);
};
