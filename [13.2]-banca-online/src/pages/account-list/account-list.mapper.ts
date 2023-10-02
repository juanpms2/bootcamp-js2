import * as viewModel from "@/core/model/";
import * as apiModel from "./api/account-list.api-model";

export const mapAccountListFromApiToVm = (
    accountList: apiModel.Account[]
): viewModel.AccountVm[] =>
    accountList.map((account) => ({
        id: account.id,
        iban: account.iban,
        name: account.name,
        balance: account.balance.toString(),
        lastTransaction: new Date(account.lastTransaction),
    }));
