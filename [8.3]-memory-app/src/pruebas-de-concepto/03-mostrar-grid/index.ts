const createGrid = () => {
	const root = document.querySelector("#app");
	const container = document.createElement("div");
	container.setAttribute("id", "grid-container");
	root?.appendChild(container);

	for (let i = 0; i < 12; i++) {
		const card = document.createElement("div");
		card.setAttribute("class", "card");
		container?.appendChild(card);
	}
};

createGrid();
