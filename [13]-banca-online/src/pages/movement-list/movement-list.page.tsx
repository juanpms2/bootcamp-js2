import React from "react";
import { AppLayout } from "@/layouts";
import { useAccountContext } from "@/core/profile/account.context";
import { getMovementList } from "./api";
import { MovementListTableComponent } from "./components/movement-list-table.component";
import { mapMovementListFromApiToVm } from "./movement-list.page.mapper";
import { MovementVm } from "./movement-list.vm";
import classes from "./movement-list.page.module.css";

export const MovementListPage: React.FC = () => {
    const { account } = useAccountContext();
    const [movementList, setMovementList] = React.useState<MovementVm[]>([]);

    React.useEffect(() => {
        getMovementList(account.id).then((apiMovementList) => {
            const vmMovementList = mapMovementListFromApiToVm(apiMovementList);
            setMovementList(vmMovementList);
            console.log(movementList);
        });
    }, [account.id]);

    return (
        <AppLayout>
            <div className={classes.root}>
                <div className={classes.headerContainer}>
                    <h1>Saldos y Últimos movimientos</h1>
                    <div className={classes.balanceContainer}>
                        SALDO DISPONIBLE
                        <span>{account.balance} €</span>
                    </div>
                </div>
                <div
                    className={`${classes.headerContainer} ${classes.movementInfo}`}
                >
                    <div>Alias: {account.name}</div>
                    <div>IBAN: {account.iban}</div>
                </div>
                <MovementListTableComponent movementList={movementList} />
            </div>
        </AppLayout>
    );
};
