const cards = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const shuffleCards = (cards: string[]): string[] => {
	const root = document.querySelector("#app");
	const title = document.createElement("h2");
	title.innerHTML = "01 Barajar cartas";
	root?.appendChild(title);

	// Fisher-Yates shuffle
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}

	const cardList = document.createElement("div");
	cardList.innerHTML = cards.map((card) => `<span>${card}, </span>`).join("");
	root?.appendChild(cardList);

	return cards;
};

console.log(shuffleCards(cards));
