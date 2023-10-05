import axios from "axios";
import { Account } from "./create-account.model";

const urlCreateAccount = `${import.meta.env.VITE_BASE_API_URL}/account-list`;

export const createAccount = async (account: Account): Promise<Account> => {
    const { data } = await axios.post<Account>(urlCreateAccount, account);
    return data;
};
