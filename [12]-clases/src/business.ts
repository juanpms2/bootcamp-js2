type TipoHabitacion = "standard" | "suite";
interface Reserva {
    tipoHabitacion: TipoHabitacion;
    desayuno: boolean;
    pax: number;
    noches: number;
}

const reservas: Reserva[] = [
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 3,
    },
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 4,
    },
    {
        tipoHabitacion: "suite",
        desayuno: true,
        pax: 2,
        noches: 1,
    },
];

class CalculaReserva {
    numeroPersonas: number;
    numeroNoches: number;
    precioHabitacion: number;
    desayuno: boolean;
    _plusDesayuno: number;
    _tipoIva: number;
    _suplemento: number;

    constructor(
        numeroPersonas: number,
        numeroNoches: number,
        precioHabitacion: number,
        desayuno: boolean
    ) {
        this.numeroPersonas = numeroPersonas;
        this.numeroNoches = numeroNoches;
        this.precioHabitacion = precioHabitacion;
        this._tipoIva = 21;
        this._suplemento = 40;
        this.desayuno = desayuno;
        this._plusDesayuno = desayuno ? 15 : 0;
    }

    calculaTotalSinIva(): number {
        const plusDesayuno =
            this._plusDesayuno * this.numeroPersonas * this.numeroNoches;
        const suplemento =
            this.numeroPersonas > 1
                ? (this.numeroPersonas - 1) * this._suplemento
                : 0;
        const total =
            this.precioHabitacion * this.numeroNoches +
            suplemento +
            plusDesayuno;
        return Number(total.toFixed(2));
    }

    calculaTotal(): number {
        const subTotal = this.calculaTotalSinIva();
        const total = subTotal + (subTotal * this._tipoIva) / 100;
        return Number(total.toFixed(2));
    }
}

class CalculaReservaCliente extends CalculaReserva {
    tipoHabitacion: TipoHabitacion;

    constructor(
        tipoHabitacion: TipoHabitacion,
        numeroPersonas: number,
        noches: number,
        desayuno: boolean
    ) {
        super(numeroPersonas, noches, 0, desayuno);
        this.tipoHabitacion = tipoHabitacion;
        this.numeroPersonas = numeroPersonas;
        this.numeroNoches = noches;
        this.precioHabitacion = this.tipoHabitacion === "standard" ? 100 : 150;
        this.desayuno = desayuno;
    }
}

reservas.map((reserva, index) => {
    const datosReserva = new CalculaReservaCliente(
        reserva.tipoHabitacion,
        reserva.pax,
        reserva.noches,
        reserva.desayuno
    );
    if (index === 0) {
        console.log("---------------------------------------------");
    }
    console.log("Reserva número ", index + 1);
    console.log("---------------------------------------------");
    console.log("Subtotal: ", datosReserva.calculaTotalSinIva());
    console.log("Total: ", datosReserva.calculaTotal());
    console.log("---------------------------------------------");
});

class CalculaReservaTourOperador extends CalculaReserva {
    _tipoHabitacion: TipoHabitacion;
    _descuento: number;

    constructor(
        tipoHabitacion: TipoHabitacion,
        numeroPersonas: number,
        noches: number,
        desayuno: boolean
    ) {
        super(numeroPersonas, noches, 0, desayuno);
        this.precioHabitacion = 100;
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

reservas.map((reserva, index) => {
    const datosReserva = new CalculaReservaTourOperador(
        reserva.tipoHabitacion,
        reserva.pax,
        reserva.noches,
        reserva.desayuno
    );
    if (index === 0) {
        console.log("---------------------------------------------");
    }
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
