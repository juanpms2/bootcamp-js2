import { validateIBAN } from "ibantools";
import { mockData } from "./mock-data";

interface IBANProps {
    nombre: string;
    codigoIban: string;
    codigoEntidad: string;
    codigoOficina: string;
    digitosControl: string;
    numeroCuenta: string;
}

const regexIban =
    /^(?<codigoIban>[A-Za-z]{2}\d{2})(\s|\-)?(?<codigoEntidad>\d{4})(\s|\-)?(?<codigoOficina>\d{4})(\s|\-)?(?<digitosControl>\d{2})(\s|\-)?(?<numeroCuenta>\d{10})$/;

export const isIbanCorrect = (iban: string): boolean =>
    validateIBAN(iban) && regexIban.test(iban);

export const loadIbanFields = (iban: string): IBANProps => {
    const coincidencia = regexIban.exec(iban);

    const {
        codigoIban,
        codigoEntidad,
        codigoOficina,
        digitosControl,
        numeroCuenta,
    } = coincidencia?.groups as unknown as IBANProps;
    const nombre =
        mockData
            .find((item) => item.includes(codigoEntidad))
            ?.replace(/\d/g, "") || "";

    return {
        nombre,
        codigoIban,
        codigoEntidad,
        codigoOficina,
        digitosControl,
        numeroCuenta,
    };
};
