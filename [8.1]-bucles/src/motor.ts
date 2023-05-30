import { Pacientes } from "./model";

export const obtenPacientesAsignadosAPediatria = (
	pacientes: Pacientes[]
): Pacientes[] => {
	let pacientesPediatra: Pacientes[] = [];
	for (let i = 0; i < pacientes.length; i++) {
		if (pacientes[i].especialidad === "Pediatra") {
			pacientesPediatra.push(pacientes[i]);
		}
	}
	return pacientesPediatra;
};
