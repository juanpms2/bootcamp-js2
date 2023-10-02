import React from "react";
import { AppLayout } from "@/layouts";
import classes from "./create-account.page.module.css";

export const CreateAccountPage: React.FC = () => {
    return (
        <AppLayout>
            <div className={classes.headerContainer}>
                <h1>Cuenta Bancaria</h1>
            </div>
            <div className={classes.formContainer}>
                <div className={classes.itemContainer}>
                    <label htmlFor="account">Tipo de cuenta:</label>
                    <select name="account" id="account">
                        <option value="1">Cuenta Corriente</option>
                        <option value="2">Cuenta de Ahorro</option>
                    </select>
                </div>
                <div className={classes.itemContainer}>
                    <label htmlFor="alias">Alias:</label>
                    <input type="text" id="alias" name="alias" />
                </div>
                <hr />
                <button>Guardar</button>
            </div>
        </AppLayout>
    );
};
