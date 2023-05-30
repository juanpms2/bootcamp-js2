import { elementReady } from "./helpers";
import { pacientes } from "./mock-data";
import { Paciente } from "./model";
import {
	obtenPacientesAsignadosAPediatria,
	obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios,
	activarProtocoloUrgencia,
	reasignaPacientesAMedicoFamilia,
	hayPacientesDePediatria,
	cuentaPacientesPorEspecialidad,
} from "./motor";

const container = elementReady("data");
const obtenerPediatria = elementReady("pediatria");
const obtenerPediatriaYMenorDeDiezAnios = elementReady(
	"pediatria-menor-de-diez"
);
const activarProtocolo = elementReady("activar-protocolo");
const reasignaPacientes = elementReady("reasigna-pacientes");
const comprobarPacientes = elementReady("comprobar-pacientes");
const contarPacientes = elementReady("contar-pacientes");

export const loadApp = () => {
	const createCard = (paciente: Paciente, message?: boolean) => {
		const card = document.createElement("div");
		card.className = "card";
		card.innerHTML = `
    <div class="card__header">
      <h2 class="card__title">${paciente.nombre} ${paciente.apellidos}</h2>
      <p class="card__subtitle">${paciente.especialidad}</p>
    </div>
    <div class="card__body">
      <p class="card__text">Temperatura: ${paciente.temperatura}</p>
      <p class="card__text">Frecuencia cardiaca: ${
				paciente.frecuenciaCardiaca
			}</p>
      <p class="card__text">Edad: ${paciente.edad}</p>
			</div>
			${
				message
					? `<p class="card__text  message">Paciente reasignado a médico de familia</p>`
					: ""
			}
  `;

		container?.appendChild(card);
	};

	const mostrarTexto = (text: string) => {
		const createAlert = document.createElement("div");
		createAlert.className = "alert";
		createAlert.innerHTML = `
		<p class="alert__text">${text}</p>
		`;

		container?.appendChild(createAlert);
	};

	const clearCards = () => {
		if (container) {
			container.innerHTML = "";
		}
	};

	const handleObtenerPediatria = () => {
		clearCards();
		const pacientesPediatria = obtenPacientesAsignadosAPediatria(pacientes);

		for (let i = 0; i < pacientesPediatria.length; i++) {
			createCard(pacientesPediatria[i]);
		}

		obtenerPediatria?.setAttribute("disabled", "true");
		obtenerPediatriaYMenorDeDiezAnios?.removeAttribute("disabled");
		activarProtocolo?.removeAttribute("disabled");
		reasignaPacientes?.removeAttribute("disabled");
		comprobarPacientes?.removeAttribute("disabled");
		contarPacientes?.removeAttribute("disabled");
	};

	const handleObtenerPediatriaYMenorDeDiezAnios = () => {
		clearCards();
		const pacientesPediatria =
			obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes);

		for (let i = 0; i < pacientesPediatria.length; i++) {
			createCard(pacientesPediatria[i]);
		}

		obtenerPediatriaYMenorDeDiezAnios?.setAttribute("disabled", "true");
		obtenerPediatria?.removeAttribute("disabled");
		activarProtocolo?.removeAttribute("disabled");
		reasignaPacientes?.removeAttribute("disabled");
		comprobarPacientes?.removeAttribute("disabled");
		contarPacientes?.removeAttribute("disabled");
	};

	const handleActivarProctoloUrgencia = () => {
		clearCards();
		const activar = activarProtocoloUrgencia(pacientes);

		if (activar) {
			mostrarTexto("Protocolo de urgencia activado");
		} else {
			mostrarTexto("No hay que activar el protocolo de urgencia");
		}

		activarProtocolo?.setAttribute("disabled", "true");
		obtenerPediatriaYMenorDeDiezAnios?.removeAttribute("disabled");
		obtenerPediatria?.removeAttribute("disabled");
		reasignaPacientes?.removeAttribute("disabled");
		comprobarPacientes?.removeAttribute("disabled");
		contarPacientes?.removeAttribute("disabled");
	};

	const handleReasignaPacientesAMedicoFamilia = () => {
		clearCards();
		const pacientesReasignados = reasignaPacientesAMedicoFamilia(pacientes);

		for (let i = 0; i < pacientesReasignados.length; i++) {
			createCard(pacientesReasignados[i], true);
		}

		reasignaPacientes?.setAttribute("disabled", "true");
		activarProtocolo?.removeAttribute("disabled");
		obtenerPediatriaYMenorDeDiezAnios?.removeAttribute("disabled");
		obtenerPediatria?.removeAttribute("disabled");
		comprobarPacientes?.removeAttribute("disabled");
		contarPacientes?.removeAttribute("disabled");
	};

	const hadleHayPacientesDePediatria = () => {
		clearCards();
		const hayPacientes = hayPacientesDePediatria(pacientes);

		if (hayPacientes) {
			mostrarTexto("Hay pacientes de pediatría, toca quedarse");
		}

		comprobarPacientes?.setAttribute("disabled", "true");
		reasignaPacientes?.removeAttribute("disabled");
		activarProtocolo?.removeAttribute("disabled");
		obtenerPediatriaYMenorDeDiezAnios?.removeAttribute("disabled");
		obtenerPediatria?.removeAttribute("disabled");
		contarPacientes?.removeAttribute("disabled");
	};

	const handleContarPacientes = () => {
		clearCards();
		const pacientesPediatria = cuentaPacientesPorEspecialidad(pacientes);

		mostrarTexto(`
			<span style="color: white">${pacientesPediatria.pediatria}</span> pacientes de pediatría
			<br />
			<span style="color: white">${pacientesPediatria.medicoDeFamilia}</span> pacientes de médico de familia
			<br />
			<span style="color: white">${pacientesPediatria.cardiologia}</span> pacientes de cardiología
		`);

		contarPacientes?.setAttribute("disabled", "true");
		comprobarPacientes?.removeAttribute("disabled");
		reasignaPacientes?.removeAttribute("disabled");
		activarProtocolo?.removeAttribute("disabled");
		obtenerPediatriaYMenorDeDiezAnios?.removeAttribute("disabled");
		obtenerPediatria?.removeAttribute("disabled");
	};

	obtenerPediatria?.addEventListener("click", handleObtenerPediatria);
	obtenerPediatriaYMenorDeDiezAnios?.addEventListener(
		"click",
		handleObtenerPediatriaYMenorDeDiezAnios
	);
	activarProtocolo?.addEventListener("click", handleActivarProctoloUrgencia);
	reasignaPacientes?.addEventListener(
		"click",
		handleReasignaPacientesAMedicoFamilia
	);
	comprobarPacientes?.addEventListener("click", hadleHayPacientesDePediatria);
	contarPacientes?.addEventListener("click", handleContarPacientes);
};
