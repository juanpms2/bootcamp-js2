import React from "react";
import { MovementVm } from "../movement-list.vm";
import classes from "./movement-list-item.component.module.css";

interface Props {
    movementItem: MovementVm;
}

export const MovementListItemComponent: React.FC<Props> = (props) => {
    const { movementItem } = props;

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
                    classes.icon
                } ${movementItem.amount < 0 && classes.isNegative}`}
            >
                {movementItem.amount.toFixed(2)}
            </span>
            <span
                className={`${classes.dataCell} ${classes.alignRight} ${
                    classes.icon
                } ${movementItem.balance < 0 && classes.isNegative}`}
            >
                {movementItem.balance.toFixed(2)}
            </span>
        </div>
    );
};
