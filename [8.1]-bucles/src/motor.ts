import { NumeroPacientesPorEspecialidad, Paciente } from "./model";

export const obtenPacientesAsignadosAPediatria = (
	pacientes: Paciente[]
): Paciente[] => {
	let pacientesPediatra: Paciente[] = [];
	for (let i = 0; i < pacientes.length; i++) {
		if (pacientes[i].especialidad === "Pediatra") {
			pacientesPediatra.push(pacientes[i]);
		}
	}
	return pacientesPediatra;
};

export const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
	pacientes: Paciente[]
): Paciente[] => {
	let pacientesPediatra: Paciente[] = [];
	for (let i = 0; i < pacientes.length; i++) {
		if (pacientes[i].especialidad === "Pediatra" && pacientes[i].edad < 10) {
			pacientesPediatra.push(pacientes[i]);
		}
	}
	return pacientesPediatra;
};

export const activarProtocoloUrgencia = (pacientes: Paciente[]): boolean => {
	let activarProctolo: boolean = false;

	for (let i = 0; i < pacientes.length; i++) {
		if (
			pacientes[i].temperatura > 40 ||
			pacientes[i].frecuenciaCardiaca > 100
		) {
			activarProctolo = true;
			break;
		}
	}

	return activarProctolo;
};

export const reasignaPacientesAMedicoFamilia = (
	pacientes: Paciente[]
): Paciente[] => {
	let pacientesReasignados: Paciente[] = [];

	for (let i = 0; i < pacientes.length; i++) {
		if (pacientes[i].especialidad === "Pediatra") {
			const reasignado: Paciente = {
				...pacientes[i],
				especialidad: "Medico de familia",
			};
			pacientesReasignados.push(reasignado);
		}
	}
	return pacientesReasignados;
};

export const hayPacientesDePediatria = (pacientes: Paciente[]): boolean => {
	let hayPacientesDePediatria: boolean = false;

	for (let i = 0; i < pacientes.length; i++) {
		if (pacientes[i].especialidad === "Pediatra") {
			hayPacientesDePediatria = true;
			break;
		}
	}

	return hayPacientesDePediatria;
};

export const cuentaPacientesPorEspecialidad = (
	pacientes: Paciente[]
): NumeroPacientesPorEspecialidad => {
	const numeroPacientesPorEspecialidad: NumeroPacientesPorEspecialidad = {
		medicoDeFamilia: 0,
		pediatria: 0,
		cardiologia: 0,
	};

	for (let i = 0; i < pacientes.length; i++) {
		if (pacientes[i].especialidad === "Medico de familia") {
			numeroPacientesPorEspecialidad.medicoDeFamilia++;
		} else if (pacientes[i].especialidad === "Pediatra") {
			numeroPacientesPorEspecialidad.pediatria++;
		} else if (pacientes[i].especialidad === "Cardiólogo") {
			numeroPacientesPorEspecialidad.cardiologia++;
		}
	}

	return numeroPacientesPorEspecialidad;
};
