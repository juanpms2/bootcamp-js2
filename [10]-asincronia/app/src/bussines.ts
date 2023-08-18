import { getCharacters } from "./api";
import { CHARACTERS_URL } from "./constants";
import { createCardList } from "./helpers";
import { mapCharactersListFromApiToCardListProps } from "./mappers";
import { CharacterApiModel, CharacterVm } from "./model";

let charactersList: CharacterVm[] = [];
export const getCharactersList = (): CharacterVm[] => charactersList;
const setCharactersList = (newCharactersList: CharacterVm[]): CharacterVm[] =>
    (charactersList = newCharactersList);

export const loadCharacters = async () => {
    const list: CharacterApiModel[] = await getCharacters(CHARACTERS_URL);
    setCharactersList(mapCharactersListFromApiToCardListProps(list));
};

export const filterByName = (name: string) => {
    if (!name) {
        restartFilter();
        return;
    }
    const filteredList = charactersList.filter((character) =>
        character.nombre.toLowerCase().includes(name.toLowerCase())
    );
    setCharactersList(filteredList);
    createCardList(filteredList);
};

export const restartFilter = async () => {
    await loadCharacters();
    createCardList(charactersList);
};