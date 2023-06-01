import "./style.css";

const cards = [
	"&#128512;",
	"&#128513;",
	"&#129299;",
	"&#128520;",
	"&#128526;",
	"&#128543;",
	"&#128531;",
	"&#128557;",
	"&#128545;",
	"&#128561;",
];

const shuffleCards = (cards: string[]): string[] => {
	const root = document.querySelector("#app");

	// Fisher-Yates shuffle
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}

	const cardList = document.createElement("div");
	cardList.className = "container";
	cardList.innerHTML = cards.map((card) => `<span>${card}</span>`).join("");
	root?.appendChild(cardList);

	return cards;
};

console.log(shuffleCards(cards));
