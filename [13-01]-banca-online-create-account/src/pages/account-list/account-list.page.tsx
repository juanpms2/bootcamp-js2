import React from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { AccountVm } from "@/core/model";
import { appRoutes } from "@/core/router";
import { getAccountList } from "./api";
import { AccountListTableComponent } from "./components/account-list-table.component";
import { mapAccountListFromApiToVm } from "./account-list.mapper";
import classes from "./account-list.page.module.css";

export const AccountListPage: React.FC = () => {
    const [accountList, setAccountList] = React.useState<AccountVm[]>([]);
    const navigate = useNavigate();

    const onCreateAccount = () => {
        navigate(appRoutes.createAccount);
    };

    React.useEffect(() => {
        getAccountList().then((result) =>
            setAccountList(mapAccountListFromApiToVm(result))
        );
    }, []);

    return (
        <AppLayout>
            <div className={classes.root}>
                <div className={classes.headerContainer}>
                    <h1>Mis cuentas</h1>
                    <button onClick={onCreateAccount}>
                        AGREGAR NUEVA CUENTA
                    </button>
                </div>
                <AccountListTableComponent accountList={accountList} />
            </div>
        </AppLayout>
    );
};
