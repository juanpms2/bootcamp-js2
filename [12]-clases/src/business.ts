export class CalculaReserva {
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
