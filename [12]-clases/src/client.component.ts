import { reservas, TipoHabitacion } from "./model";
import { CalculaReserva } from "./business";

class CalculaReservaCliente extends CalculaReserva {
    tipoHabitacion: TipoHabitacion;

    constructor(
        tipoHabitacion: TipoHabitacion,
        numeroPersonas: number,
        noches: number,
        desayuno: boolean
    ) {
        super(
            numeroPersonas,
            noches,
            tipoHabitacion === "standard" ? 100 : 150,
            desayuno
        );
        this.tipoHabitacion = tipoHabitacion;
        this.numeroPersonas = numeroPersonas;
        this.numeroNoches = noches;
        this.desayuno = desayuno;
    }
}

console.log("*********************************************");
console.log("CLIENTE ");
console.log("---------------------------------------------");
reservas.map((reserva, index) => {
    const datosReserva = new CalculaReservaCliente(
        reserva.tipoHabitacion,
        reserva.pax,
        reserva.noches,
        reserva.desayuno
    );

    console.log("Reserva número ", index + 1);
    console.log("---------------------------------------------");
    console.log("Subtotal: ", datosReserva.calculaTotalSinIva());
    console.log("Total: ", datosReserva.calculaTotal());
    console.log("---------------------------------------------");
});
