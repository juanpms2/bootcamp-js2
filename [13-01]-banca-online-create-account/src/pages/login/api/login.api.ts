import Axios from "axios";
import { Credentials } from "./login.api-model";

const url = `http://localhost:3000/login`;

export const isValidLogin = async (credential: Credentials): Promise<boolean> =>
    Axios.post<boolean>(url, credential).then(({ data }) => data);
