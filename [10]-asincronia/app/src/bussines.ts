import { getCharacters } from "./api";
import { CHARACTERS_URL } from "./constants";
import { createCardList } from "./helpers";
import { mapCharactersListFromApiToCardListProps } from "./mappers";
import { CharacterVm } from "./model";

export const loadCharacters = async (): Promise<CharacterVm[]> => {
    const list = await getCharacters(CHARACTERS_URL)
        .then((response) => response)
        .catch((error) => {
            throw new Error(error);
        });
    return mapCharactersListFromApiToCardListProps(list);
};

export const filterByName = (charactersList: CharacterVm[], filter: string) => {
    if (!filter) {
        createCardList(charactersList);
        return;
    }
    const filteredList = charactersList.filter((character) =>
        character.nombre.toLowerCase().includes(filter.toLowerCase())
    );
    createCardList(filteredList);
};
