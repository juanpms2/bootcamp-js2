export const routesPrefixes = {
    account: "/account-list/:id",
    accountList: "/account-list",
    transfer: "/transfer",
    movements: "/movements",
};

export const appRoutes = {
    root: "/",
    accountList: routesPrefixes.accountList,
    createAccount: "/create-account",
    editAccount: "/edit-account/:id",
    movements: `${routesPrefixes.movements}/:id`,
    transfer: routesPrefixes.transfer,
    transferFromAccount: `${routesPrefixes.transfer}/:id`,
};
