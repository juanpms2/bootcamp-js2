import { getCharacters } from "./api";
import { CHARACTERS_URL } from "./constants";
import { createCardList } from "./helpers";
import { mapCharactersListFromApiToCardListProps } from "./mappers";
import { CharacterVm } from "./model";

let charactersList: CharacterVm[] = [];

export const loadCharacters = async (): Promise<CharacterVm[]> => {
    const list = await getCharacters(CHARACTERS_URL)
        .then((response) => response)
        .catch((error) => {
            throw new Error(error);
        });
    charactersList = mapCharactersListFromApiToCardListProps(list);
    return charactersList;
};

export const filterByName = (name: string) => {
    if (!name) {
        createCardList(charactersList);
        return;
    }
    const filteredList = charactersList.filter((character) =>
        character.nombre.toLowerCase().includes(name.toLowerCase())
    );
    createCardList(filteredList);
};
