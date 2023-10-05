import React from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { getAccount, getMovementList } from "./api";
import { MovementListTableComponent } from "./components/movement-list-table.component";
import { mapListAccountMovementFromApiToVm } from "./movement-list.page.mapper";
import {
    ListAccountMovementsVm,
    createEmptyListAccountMovementsVm,
} from "./movement-list.vm";
import classes from "./movement-list.page.module.css";

export const MovementListPage: React.FC = () => {
    const [listAccountMovements, setListAccountMovements] =
        React.useState<ListAccountMovementsVm>(
            createEmptyListAccountMovementsVm()
        );
    const { id } = useParams();

    const loadlistAccountMovements = async (id: string) => {
        try {
            const apiMovementList = await getMovementList(id);
            const apiAccount = await getAccount(id);
            const list = mapListAccountMovementFromApiToVm(
                apiMovementList,
                apiAccount
            );
            setListAccountMovements(list);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (id) {
            loadlistAccountMovements(id);
        }
    }, []);

    console.log(listAccountMovements);

    return (
        <AppLayout>
            <div className={classes.root}>
                <div className={classes.headerContainer}>
                    <h1>Saldos y Últimos movimientos</h1>
                    <div className={classes.balanceContainer}>
                        SALDO DISPONIBLE
                        <span>{listAccountMovements.balance.toFixed(2)}</span>
                    </div>
                </div>
                <div
                    className={`${classes.headerContainer} ${classes.movementInfo}`}
                >
                    <div>Alias: {listAccountMovements.accountName}</div>
                    <div>IBAN: {listAccountMovements.iban}</div>
                </div>
                <MovementListTableComponent
                    movementList={listAccountMovements.movementList}
                />
            </div>
        </AppLayout>
    );
};
