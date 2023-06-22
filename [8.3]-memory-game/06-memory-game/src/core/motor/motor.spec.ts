import { Card } from "../model";
import { shuffleCards } from "./motor";

describe("motor specs", () => {
	describe("shuffleCards specs", () => {
		it.each([
			[null, []],
			[undefined, []],
			[[], []],
		])("should return %s when card list is %s", (cardList, expected) => {
			//Arrange
			//Act
			const result = shuffleCards(cardList);
			//Assert
			expect(result).toEqual(expected);
		});
		it("should return a card list", () => {
			//Arrange
			const cardList: Card[] = [
				{
					card: { id: 1, imageUrl: "image1" },
					isFlipped: false,
					isFound: false,
				},
				{
					card: { id: 2, imageUrl: "image2" },
					isFlipped: false,
					isFound: false,
				},
			];

			//Act
			const result = shuffleCards(cardList);

			//Assert
			expect(result).toEqual(cardList);
		});
	});
});
