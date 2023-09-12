import React from "react";
import { AccountVm, createDefaultAccountVm } from "@/core/model";

interface AccountContext {
    account: AccountVm;
    setAccount: (account: AccountVm) => void;
}

const AccountContext = React.createContext<AccountContext>({
    account: createDefaultAccountVm(),
    setAccount: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const AccountProvider: React.FC<Props> = ({ children }) => {
    const [account, setAccount] = React.useState<AccountVm>(
        createDefaultAccountVm()
    );

    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export const useAccountContext = () => React.useContext(AccountContext);
