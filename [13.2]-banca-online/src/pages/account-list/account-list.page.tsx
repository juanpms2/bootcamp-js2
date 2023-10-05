import React from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/core/router";
import { AppLayout } from "@/layouts";
import { AccountVm } from "./account-list.vm";
import classes from "./account-list.page.module.css";
import { AccountListTableComponent } from "./components/account-list-table.component";
import { getAccountList } from "./api";
import { mapAccountListFromApiToVm } from "./account-list.mapper";

export const AccountListPage: React.FC = () => {
    const [accountList, setAccountList] = React.useState<AccountVm[]>([]);
    const navigate = useNavigate();

    const handleClick = () => navigate(appRoutes.createAccount);

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
                    <button onClick={handleClick}>AGREGAR NUEVA CUENTA</button>
                </div>
                <AccountListTableComponent accountList={accountList} />
            </div>
        </AppLayout>
    );
};
