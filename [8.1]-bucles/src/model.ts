type Especialidad = "Medico de familia" | "Pediatra" | "Cardiólogo";

export interface Pacientes {
	id: number;
	nombre: string;
	apellidos: string;
	sexo: string;
	temperatura: number;
	frecuenciaCardiaca: number;
	especialidad: Especialidad;
	edad: number;
}
