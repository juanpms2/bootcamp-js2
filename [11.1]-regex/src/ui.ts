import { isIbanCorrect, loadIbanFields } from "./business";
import { elementReady } from "./helpers";

const checkButton = elementReady("checkButton", HTMLButtonElement);
const input = elementReady("input", HTMLInputElement);
const result = elementReady("result", HTMLParagraphElement);
const ibanElement = elementReady("iban", HTMLParagraphElement);
const bancoElement = elementReady("banco", HTMLParagraphElement);
const entidadElement = elementReady("entidad", HTMLParagraphElement);
const oficinaElement = elementReady("oficina", HTMLParagraphElement);
const controlElement = elementReady("control", HTMLParagraphElement);
const cuentaElement = elementReady("cuenta", HTMLParagraphElement);

export const loadApp = () => {
    checkButton.addEventListener("click", () => {
        const ibanValue = input.value;

        if (isIbanCorrect(ibanValue)) {
            const {
                nombre,
                codigoIban,
                codigoEntidad,
                codigoOficina,
                digitosControl,
                numeroCuenta,
            } = loadIbanFields(ibanValue);
            result.classList.remove("error");
            result.className = "success";
            result.textContent = "IBAN correcto";
            ibanElement.textContent = `Codigo IBAN: ${codigoIban}`;
            bancoElement.textContent = `Nombre Banco: ${nombre}`;
            entidadElement.textContent = `Codigo Entidad: ${codigoEntidad}`;
            oficinaElement.textContent = `Codigo Oficina: ${codigoOficina}`;
            controlElement.textContent = `Digitos Control: ${digitosControl}`;
            cuentaElement.textContent = `Numero Cuenta: ${numeroCuenta}`;
        } else {
            result.classList.remove("success");
            result.className = "error";
            result.textContent = "IBAN incorrecto";
            ibanElement.textContent = "";
            bancoElement.textContent = "";
            entidadElement.textContent = "";
            oficinaElement.textContent = "";
            controlElement.textContent = "";
            cuentaElement.textContent = "";
        }
    });
};
