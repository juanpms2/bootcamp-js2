import { Board } from "../model";
import {
	updateStatusGameHelper,
	canBeFlippedHelper,
	flipCardHelper,
	markSelectedPairCardAsMatchedHelper,
	resetSelectedPairCardsEngineHelper,
	updateMovesHelper,
} from "./motor.helpers";

describe("motor-helpers specs", () => {
	describe("updateStatusGameHeper specs", () => {
		it("should return statusGame: UnaCartaLevantada and indexCardFlipA: index when statusGame is CeroCartasLevantadas", () => {
			//Arrange
			const cardIndex = 0;
			const board: Board = {
				cardList: [
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
				],
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Act
			const result = updateStatusGameHelper(cardIndex, board);
			const expectedResult: Board = {
				cardList: [
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
				],
				statusGame: "UnaCartaLevantada",
				indexCardFlipA: 0,
				indexCardFlipB: null,
				moves: 0,
			};

			//Assert
			expect(result).toEqual(expectedResult);
		});
		it("should return statusGame: DosCartasLevantadas and indexCardFlipB: index when statusGame is UnaCartaLevantada", () => {
			//Arrange
			const cardIndex = 1;
			const board: Board = {
				cardList: [
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
				],
				statusGame: "UnaCartaLevantada",
				indexCardFlipA: 0,
				indexCardFlipB: null,
				moves: 0,
			};

			//Act
			const result = updateStatusGameHelper(cardIndex, board);
			const expectedResult: Board = {
				cardList: [
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
				],
				statusGame: "DosCartasLevantadas",
				indexCardFlipA: 0,
				indexCardFlipB: 1,
				moves: 0,
			};

			//Assert
			expect(result).toEqual(expectedResult);
		});

		it("should return statusGame: CeroCartasLevantadas and indexCardFlipA and indexCardFlipB to null when statusGame is DosCartasLevantadas", () => {
			//Arrange
			const cardIndex = 1;
			const board: Board = {
				cardList: [
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
				],
				statusGame: "DosCartasLevantadas",
				indexCardFlipA: 0,
				indexCardFlipB: 1,
				moves: 0,
			};

			//Act
			const result = updateStatusGameHelper(cardIndex, board);
			const expectedResult: Board = {
				cardList: [
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
				],
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Assert
			expect(result).toEqual(expectedResult);
		});

		it("should return the same board when statusGame is PartidaCompleta", () => {
			//Arrange
			const cardIndex = 1;
			const board: Board = {
				cardList: [
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
				],
				statusGame: "PartidaCompleta",
				indexCardFlipA: 0,
				indexCardFlipB: 1,
				moves: 0,
			};

			//Act
			const result = updateStatusGameHelper(cardIndex, board);

			//Assert
			expect(result).toEqual(board);
		});
	});

	describe("canBeFlippedHelper specs", () => {
		it("should return false when card isFlipped is true", () => {
			//Arrange
			const card = {
				card: { id: 1, imageUrl: "image1" },
				isFlipped: true,
				isFound: false,
			};
			const statusGame = "DosCartasLevantadas";

			//Act
			const result = canBeFlippedHelper(card, statusGame);

			//Assert
			expect(result).toEqual(false);
		});

		it("should return false when statusGame is DosCartasLevantadas", () => {
			//Arrange
			const card = {
				card: { id: 1, imageUrl: "image1" },
				isFlipped: false,
				isFound: false,
			};
			const statusGame = "DosCartasLevantadas";

			//Act
			const result = canBeFlippedHelper(card, statusGame);

			//Assert
			expect(result).toEqual(false);
		});

		it("should return true when card isFlipped is false and statusGame is CeroCartasLevantadas", () => {
			//Arrange
			const card = {
				card: { id: 1, imageUrl: "image1" },
				isFlipped: false,
				isFound: false,
			};
			const statusGame = "CeroCartasLevantadas";

			//Act
			const result = canBeFlippedHelper(card, statusGame);

			//Assert
			expect(result).toEqual(true);
		});

		it("should return true when card isFlipped is false and statusGame is UnaCartaLevantada", () => {
			//Arrange
			const card = {
				card: { id: 1, imageUrl: "image1" },
				isFlipped: false,
				isFound: false,
			};
			const statusGame = "UnaCartaLevantada";

			//Act
			const result = canBeFlippedHelper(card, statusGame);

			//Assert
			expect(result).toEqual(true);
		});
	});

	describe("flipCardHelper specs", () => {
		it("should return cardList with isFlipped true for card index", () => {
			//Arrange
			const index = 0;
			const board: Board = {
				cardList: [
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
				],
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Act
			const result = flipCardHelper(index, board);
			const expectedResult: Board = {
				cardList: [
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: true,
						isFound: false,
					},
					{
						card: { id: 2, imageUrl: "image2" },
						isFlipped: false,
						isFound: false,
					},
				],
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Assert
			expect(result).toEqual(expectedResult);
		});

		it("should return the same board when cardList is null", () => {
			//Arrange
			const index = 0;
			const board: Board = {
				cardList: null,
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Act
			const result = flipCardHelper(index, board);

			//Assert
			expect(result).toEqual(board);
		});

		it("should return the same board when cardList is undefined", () => {
			//Arrange
			const index = 0;
			const board: Board = {
				cardList: undefined,
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Act
			const result = flipCardHelper(index, board);

			//Assert
			expect(result).toEqual(board);
		});

		it("should return the same board when cardList is empty", () => {
			//Arrange
			const index = 0;
			const board: Board = {
				cardList: [],
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Act
			const result = flipCardHelper(index, board);

			//Assert
			expect(result).toEqual(board);
		});
	});

	describe("markSelectedPairCardAsMatchedHelper specs", () => {
		it("should return cardList with isFound equal true for card indexCardFlipA and indexCArdFlipB, statusGame equal to CeroCartasLevantadas and indexCardFlipA and indexCardFlipB equal null", () => {
			//Arrange
			const board: Board = {
				cardList: [
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: true,
						isFound: false,
					},
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: true,
						isFound: false,
					},
				],
				statusGame: "DosCartasLevantadas",
				indexCardFlipA: 0,
				indexCardFlipB: 1,
				moves: 0,
			};

			//Act
			const result = markSelectedPairCardAsMatchedHelper(board);
			const expectedResult: Board = {
				cardList: [
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: true,
						isFound: true,
					},
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: true,
						isFound: true,
					},
				],
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe("resetSelectedPairCardsEngineHelper specs", () => {
		it("should return cardList with isFlipped equal false for card indexCardFlipA and indexCArdFlipB, statusGame equal to CeroCartasLevantadas and indexCardFlipA and indexCardFlipB equal null", () => {
			//Arrange
			const board: Board = {
				cardList: [
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: true,
						isFound: false,
					},
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: true,
						isFound: false,
					},
				],
				statusGame: "DosCartasLevantadas",
				indexCardFlipA: 0,
				indexCardFlipB: 1,
				moves: 0,
			};

			//Act
			const result = resetSelectedPairCardsEngineHelper(board);
			const expectedResult: Board = {
				cardList: [
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: false,
						isFound: false,
					},
					{
						card: { id: 1, imageUrl: "image1" },
						isFlipped: false,
						isFound: false,
					},
				],
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Assert
			expect(result).toEqual(expectedResult);
		});
	});

	describe("updateMovesHelper specs", () => {
		it("should return moves + 1", () => {
			//Arrange
			const board: Board = {
				cardList: null,
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 0,
			};

			//Act
			const result = updateMovesHelper(board);
			const expectedResult: Board = {
				cardList: null,
				statusGame: "CeroCartasLevantadas",
				indexCardFlipA: null,
				indexCardFlipB: null,
				moves: 1,
			};

			//Assert
			expect(result).toEqual(expectedResult);
		});
	});
});
