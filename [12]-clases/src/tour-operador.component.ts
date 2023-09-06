import { reservas, TipoHabitacion } from "./model";
import { CalculaReserva } from "./business";

class CalculaReservaTourOperador extends CalculaReserva {
    _tipoHabitacion: TipoHabitacion;
    _descuento: number;

    constructor(
        tipoHabitacion: TipoHabitacion,
        numeroPersonas: number,
        noches: number,
        desayuno: boolean
    ) {
        super(numeroPersonas, noches, 100, desayuno);
        this._descuento = 15;
        this._tipoHabitacion = tipoHabitacion;
        this.desayuno = desayuno;
    }

    calculaTotalSinIvaTourOperador(): number {
        const subTotal = this.calculaTotalSinIva();
        const totalConDescuento = subTotal - (subTotal * this._descuento) / 100;
        return Number(totalConDescuento.toFixed(2));
    }

    calculaTotalTourOperador(): number {
        const total = this.calculaTotal();
        const totalConDescuento = total - (total * this._descuento) / 100;
        return Number(totalConDescuento.toFixed(2));
    }
}

console.log("*********************************************");
console.log("TOUR OPERADOR ");
console.log("---------------------------------------------");
reservas.map((reserva, index) => {
    const datosReserva = new CalculaReservaTourOperador(
        reserva.tipoHabitacion,
        reserva.pax,
        reserva.noches,
        reserva.desayuno
    );
    console.log("Reserva número ", index + 1);
    console.log("---------------------------------------------");
    console.log(
        "Subtotal Tour Operador: ",
        datosReserva.calculaTotalSinIvaTourOperador()
    );
    console.log(
        "Total Tour Operador: ",
        datosReserva.calculaTotalTourOperador()
    );
    console.log("---------------------------------------------");
});
