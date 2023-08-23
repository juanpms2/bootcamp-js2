import axios from "axios";
import { CharacterModel } from "./model";
import { CHARACTERS_URL, FILTERED_CHARACTERS_URL } from "./constants";

export const getCharacters = async (): Promise<CharacterModel[]> => {
    const { data } = await axios.get(CHARACTERS_URL);
    return data;
};

export const getFilteredCharacters = async (
    filter: string
): Promise<CharacterModel[]> => {
    const url = FILTERED_CHARACTERS_URL(filter);
    const { data } = await axios.get(url);
    return data;
};
