import { NumeroPacientesPorEspecialidad, Paciente } from "./model";

export const obtenPacientesAsignadosAPediatria = (
	pacientes: Paciente[]
): Paciente[] =>
	pacientes.filter((paciente) => paciente.especialidad === "Pediatra");

export const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
	pacientes: Paciente[]
): Paciente[] =>
	pacientes.filter(
		(paciente) => paciente.especialidad === "Pediatra" && paciente.edad < 10
	);

export const activarProtocoloUrgencia = (pacientes: Paciente[]): boolean =>
	pacientes.some(
		(paciente) => paciente.temperatura > 40 || paciente.frecuenciaCardiaca > 100
	);

export const reasignaPacientesAMedicoFamilia = (
	pacientes: Paciente[]
): Paciente[] =>
	pacientes.filter((paciente) => paciente.especialidad === "Pediatra");

export const hayPacientesDePediatria = (pacientes: Paciente[]): boolean =>
	pacientes.some((paciente) => paciente.especialidad === "Pediatra");

export const cuentaPacientesPorEspecialidad = (
	pacientes: Paciente[]
): NumeroPacientesPorEspecialidad => {
	const totalMedicoDeFamilia = pacientes.reduce((acc, paciente) => {
		if (paciente.especialidad === "Medico de familia") {
			acc++;
		}
		return acc;
	}, 0);
	const totalPediatria = pacientes.reduce((acc, paciente) => {
		if (paciente.especialidad === "Pediatra") {
			acc++;
		}
		return acc;
	}, 0);
	const totalCardiologia = pacientes.reduce((acc, paciente) => {
		if (paciente.especialidad === "Cardiólogo") {
			acc++;
		}
		return acc;
	}, 0);

	return {
		medicoDeFamilia: totalMedicoDeFamilia,
		pediatria: totalPediatria,
		cardiologia: totalCardiologia,
	};
};
