import { getCharacters, getFilteredCharacters } from "./api";
import { createCardList } from "./helpers";
import { CharacterModel } from "./model";

export const loadCharacters = async (): Promise<CharacterModel[]> => {
    const list = await getCharacters()
        .then((response) => response)
        .catch((error) => {
            throw new Error(error);
        });
    return list;
};

export const filterByName = async (filter: string) => {
    const filteredList = await getFilteredCharacters(filter)
        .then((response) => response)
        .catch((error) => {
            throw new Error(error);
        });
    createCardList(filteredList);
};
