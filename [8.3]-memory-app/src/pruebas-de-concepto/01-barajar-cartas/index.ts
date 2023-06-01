const cards = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const shuffleCards = (cards: string[]): string[] => {
	// Fisher-Yates shuffle
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = cards[i];
		cards[i] = cards[j];
		cards[j] = temp;
	}

	return cards;
};

console.log(shuffleCards(cards));
