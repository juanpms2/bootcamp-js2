import "./style.css";

interface Props {
    codigoIban: string;
    codigoEntidad: string;
    codigoOficina: string;
    digitosControl: string;
    numeroCuenta: string;
}

const isCorrect = (iban: string) => {
    const regexIban =
        /^(?<codigoIban>[A-Za-z]{2}\d{2})(\s|\-)?(?<codigoEntidad>\d{4})(\s|\-)?(?<codigoOficina>\d{4})(\s|\-)?(?<digitosControl>\d{2})(\s|\-)?(?<numeroCuenta>\d{10})$/;
    const coincidencia = regexIban.exec(iban);

    if (coincidencia) {
        const {
            codigoIban,
            codigoEntidad,
            codigoOficina,
            digitosControl,
            numeroCuenta,
        } = coincidencia.groups as unknown as Props;

        console.log(codigoIban);
        console.log(codigoEntidad);
        console.log(codigoOficina);
        console.log(digitosControl);
        console.log(numeroCuenta);
    }
    return regexIban.test(iban);
};

console.log(isCorrect("ES2114650100722030876293"));
console.log(isCorrect("ES21 1465 0100 72 2030876293"));
console.log(isCorrect("ES21-1465-0100-72-2030876293"));