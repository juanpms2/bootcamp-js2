import axios from "axios";
import { Account, Movement } from "./movement-list.api-model";

const urlMovements = `${import.meta.env.VITE_BASE_API_URL}/movements/`;

export const getMovementList = async (
    accountId: string
): Promise<Movement[]> => {
    const { data } = await axios.get<Movement[]>(urlMovements, {
        params: { accountId },
    });
    return data;
};

const urlAccount = `${import.meta.env.VITE_BASE_API_URL}/account-list/`;

export const getAccount = async (accountId: string): Promise<Account> => {
    const { data } = await axios.get(urlAccount + accountId);
    return data;
};
