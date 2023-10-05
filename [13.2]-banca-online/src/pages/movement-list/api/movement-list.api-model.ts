export interface Movement {
    id: string;
    description: string;
    amount: number;
    balance: number;
    transaction: Date;
    realTransaction: Date;
    accountId: string;
}

export interface Account {
    id: string;
    iban: string;
    type: string;
    name: string;
    balance: number;
    lastTransaction: string;
}
