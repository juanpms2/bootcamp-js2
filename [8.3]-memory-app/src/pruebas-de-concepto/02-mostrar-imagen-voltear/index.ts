console.log("Hello mostrar-imagen-voltear!");

const root = document.querySelector("#app");
const container = document.createElement("div");
container.setAttribute("class", "container");
root?.appendChild(container);

const createCard = (id: string, imgUrl: string) => {
	const flipContainer: HTMLDivElement = document.createElement("div");
	flipContainer.setAttribute("class", "flip-container");
	flipContainer.setAttribute("id", id);
	container?.appendChild(flipContainer);

	const flipper: HTMLDivElement = document.createElement("div");
	flipper.setAttribute("class", "flipper");
	flipContainer.appendChild(flipper);

	const front: HTMLDivElement = document.createElement("div");
	front.setAttribute("class", "front");
	flipper.appendChild(front);

	const back: HTMLDivElement = document.createElement("div");
	back.setAttribute("class", "back");
	back.setAttribute(
		"style",
		`background-image: url(${imgUrl}), linear-gradient(to bottom, rgba(30, 75, 115, .2), rgba(255, 255, 255, 0))`
	);
	flipper.appendChild(back);

	flipContainer.addEventListener("click", () => {
		document.querySelector(`#${id}`)?.classList.add("flip");
		setTimeout(() => {
			document.querySelector(`#${id}`)?.classList.remove("flip");
		}, 5000);
	});

	return flipContainer;
};

createCard(
	"card-1",
	"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png"
);
