import React from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/core/router";
import { AppLayout } from "@/layouts";
import { createAccount } from "./api";
import classes from "./create-account.page.module.css";

export const CreateAccountPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const account = {
                type: event.currentTarget.account.value,
                name: event.currentTarget.alias.value,
            };
            if (!account.type || !account.name) {
                throw new Error("Todos los campos son obligatorios");
            }
            await createAccount(account);
            navigate(appRoutes.accountList);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AppLayout>
            <div className={classes.headerContainer}>
                <h1>Cuenta Bancaria</h1>
            </div>
            <form onSubmit={handleSubmit} className={classes.formContainer}>
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
                <button type="submit">Guardar</button>
            </form>
        </AppLayout>
    );
};
