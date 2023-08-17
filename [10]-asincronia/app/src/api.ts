import axios from "axios";
import { Character } from "./model";

export const getCharacters = async (url: string): Promise<Character[]> => {
    const { data } = await axios.get(url);
    return data;
};
