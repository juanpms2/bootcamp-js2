import axios from "axios";
import { CharacterApiModel } from "./model";

export const getCharacters = async (
    url: string
): Promise<CharacterApiModel[]> => {
    const { data } = await axios.get(url);
    return data;
};
