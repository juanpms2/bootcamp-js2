export interface AccountVm {
    id: string;
    iban: string;
    name: string;
    balance: string;
    lastTransaction: Date;
}

export const createDefaultAccountVm = (): AccountVm => ({
    id: "",
    iban: "",
    name: "",
    balance: "",
    lastTransaction: new Date(),
});