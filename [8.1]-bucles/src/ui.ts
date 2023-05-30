import { elementReady } from "./helpers";
import { pacientes } from "./mock-data";
import { Pacientes } from "./model";
import { obtenPacientesAsignadosAPediatria } from "./motor";

const container = elementReady("data");
const obtenerPediatria = elementReady("pediatria");

export const loadApp = () => {
	const createCard = (paciente: Pacientes) => {
		const card = document.createElement("div");
		card.className = "card";
		card.innerHTML = `
    <div class="card__header">
      <h2 class="card__title">${paciente.nombre} ${paciente.apellidos}</h2>
      <p class="card__subtitle">${paciente.especialidad}</p>
    </div>
    <div class="card__body">
      <p class="card__text">Temperatura: ${paciente.temperatura}</p>
      <p class="card__text">Frecuencia cardiaca: ${paciente.frecuenciaCardiaca}</p>
      <p class="card__text">Edad: ${paciente.edad}</p>
    </div>
  `;

		container?.appendChild(card);
	};

	const handleObtenerPediatria = () => {
		const pacientesPediatria = obtenPacientesAsignadosAPediatria(pacientes);

		for (let i = 0; i < pacientesPediatria.length; i++) {
			createCard(pacientesPediatria[i]);
		}
		obtenerPediatria?.setAttribute("disabled", "true");
	};

	obtenerPediatria?.addEventListener("click", handleObtenerPediatria);
};
