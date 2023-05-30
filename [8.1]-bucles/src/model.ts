type Especialidad = "Medico de familia" | "Pediatra" | "Cardiólogo";

export interface Paciente {
	id: number;
	nombre: string;
	apellidos: string;
	sexo: string;
	temperatura: number;
	frecuenciaCardiaca: number;
	especialidad: Especialidad;
	edad: number;
}

export interface NumeroPacientesPorEspecialidad {
	medicoDeFamilia: number;
	pediatria: number;
	cardiologia: number;
}
