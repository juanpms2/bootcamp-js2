import React from "react";
import { MovementVm } from "../movement-list.vm";
import classes from "./movement-list-item.component.module.css";

interface Props {
    movementItem: MovementVm;
}

export const MovementListItemComponent: React.FC<Props> = (props) => {
    const { movementItem } = props;
    const amountNegative = Number(movementItem.amount) < 0;
    const balanceNegative = Number(movementItem.balance) < 0;

    return (
        <div className={classes.row}>
            <span className={`${classes.dataCell}`}>
                {movementItem.transaction.toLocaleDateString()}
            </span>
            <span className={classes.dataCell}>
                {movementItem.realTransaction.toLocaleDateString()}
            </span>
            <span className={classes.dataCell}>{movementItem.description}</span>
            <span
                className={`${classes.dataCell} ${classes.alignRight} ${
                    amountNegative && classes.isNegative
                }`}
            >
                {movementItem.amount} €
            </span>
            <span
                className={`${classes.dataCell} ${classes.alignRight} ${
                    balanceNegative && classes.isNegative
                }`}
            >
                {movementItem.balance} €
            </span>
        </div>
    );
};
