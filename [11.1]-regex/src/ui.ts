import { isIbanCorrect, loadIbanFields } from "./motor";
import { elementReady } from "./helpers";

const checkButton = elementReady("checkButton", HTMLButtonElement);

export const loadApp = () => {
    checkButton.addEventListener("click", () => {
        const input = elementReady("input", HTMLInputElement);
        const result = elementReady("result", HTMLParagraphElement);
        const ibanElement = elementReady("iban", HTMLParagraphElement);
        const entidadElement = elementReady("entidad", HTMLParagraphElement);
        const oficinaElement = elementReady("oficina", HTMLParagraphElement);
        const controlElement = elementReady("control", HTMLParagraphElement);
        const cuentaElement = elementReady("cuenta", HTMLParagraphElement);

        checkButton.addEventListener("click", () => {
            const ibanValue = input.value;
            console.log(ibanValue);
            if (isIbanCorrect(ibanValue)) {
                const {
                    codigoIban,
                    codigoEntidad,
                    codigoOficina,
                    digitosControl,
                    numeroCuenta,
                } = loadIbanFields(ibanValue);
                result.textContent = "IBAN correcto";
                ibanElement.textContent = `Codigo IBAN: ${codigoIban}`;
                entidadElement.textContent = `Codigo Entidad: ${codigoEntidad}`;
                oficinaElement.textContent = `Codigo Oficina: ${codigoOficina}`;
                controlElement.textContent = `Digitos Control: ${digitosControl}`;
                cuentaElement.textContent = `Numero Cuenta: ${numeroCuenta}`;
            } else {
                result.textContent = "IBAN incorrecto";
                ibanElement.textContent = "";
                entidadElement.textContent = "";
                oficinaElement.textContent = "";
                controlElement.textContent = "";
                cuentaElement.textContent = "";
            }
        });
    });
};
