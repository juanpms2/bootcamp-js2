export interface Movement {
    id: string;
    description: string;
    amount: number;
    balance: number;
    transaction: Date;
    realTransaction: Date;
    accountId: string;
}
export interface ListAccountMovementsVm {
    accountName: string;
    iban: string;
    balance: number;
    movementList: Movement[];
}

export const createEmptyListAccountMovementsVm = (): ListAccountMovementsVm => ({
    accountName: "",
    iban: "",
    balance: 0,
    movementList: [],
});
