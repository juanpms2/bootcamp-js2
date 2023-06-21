// import { Board, Card } from "./model";
// import {
// 	canBeFlipped,
// 	checkMatch,
// 	flipCard,
// 	getBoard,
// 	isGameFinished,
// 	markSelectedPairCardAsMatched,
// 	resetSelectedPairCardsEngine,
// 	shuffleCards,
// 	updateStatusGame,
// } from "./motor";

// describe("motor specs", () => {
// 	describe("shuffleCards specs", () => {
// 		it.each([
// 			[null, []],
// 			[undefined, []],
// 			[[], []],
// 		])("should return %s when card list is %s", (cardList, expected) => {
// 			//Arrange
// 			//Act
// 			const result = shuffleCards(cardList);
// 			//Assert
// 			expect(result).toEqual(expected);
// 		});
// 		it("should return a card list", () => {
// 			//Arrange
// 			const cardList: Card[] = [
// 				{
// 					card: { id: 1, imageUrl: "image1" },
// 					isFlipped: false,
// 					isFound: false,
// 				},
// 				{
// 					card: { id: 2, imageUrl: "image2" },
// 					isFlipped: false,
// 					isFound: false,
// 				},
// 			];

// 			//Act
// 			const result = shuffleCards(cardList);

// 			//Assert
// 			expect(result).toEqual(cardList);
// 		});
// 	});

// 	describe("canBeFlipped specs", () => {
// 		it("Should return false if the card is flipped", () => {
// 			// Arrange
// 			const index = 0;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "CeroCartasLevantadas",
// 				indexCardFlipA: null,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};
// 			// Act
// 			const result = canBeFlipped(index, board);

// 			// Assert
// 			expect(result).toEqual(false);
// 		});

// 		it("Should return true if the card is not flipped", () => {
// 			// Arrange
// 			const index = 0;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "CeroCartasLevantadas",
// 				indexCardFlipA: null,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};
// 			// Act
// 			const result = canBeFlipped(index, board);

// 			// Assert
// 			expect(result).toEqual(true);
// 		});
// 	});

// 	describe("flipCard specs", () => {
// 		it("Should update card list with the card flipped if card flipped index is equal to index", () => {
// 			// Arrange
// 			const index = 0;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "CeroCartasLevantadas",
// 				indexCardFlipA: null,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};
// 			// Act
// 			flipCard(index, board);
// 			const result = getBoard();
// 			const spectedResult: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "CeroCartasLevantadas",
// 				indexCardFlipA: null,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};

// 			// Assert
// 			expect(result).toEqual(spectedResult);
// 		});
// 	});

// 	describe("updateStatusGame specs", () => {
// 		it("Should update status game to UnaCartaLevantada and indexCardFlipA to index value if status game is CeroCartasLevantadas", () => {
// 			// Arrange
// 			const index = 0;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "CeroCartasLevantadas",
// 				indexCardFlipA: null,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};
// 			// Act
// 			updateStatusGame(index, board);
// 			const result = getBoard();
// 			const spectedResult: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "UnaCartaLevantada",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};

// 			// Assert
// 			expect(result).toEqual(spectedResult);
// 		});
// 		it("Should update status game to DosCartasLevantadas and indexCardFlipB to index if status game is UnaCartaLevantada", () => {
// 			// Arrange
// 			const index = 1;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "UnaCartaLevantada",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};
// 			// Act
// 			updateStatusGame(index, board);
// 			const result = getBoard();
// 			const spectedResult: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};

// 			// Assert
// 			expect(result).toEqual(spectedResult);
// 		});
// 		it("Should update status game to CeroCartasLevantadas and indexCardFlipA and indexCardFlipB to null if status game is DosCartasLevantadas", () => {
// 			// Arrange
// 			const index = 1;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};
// 			// Act
// 			updateStatusGame(index, board);
// 			const result = getBoard();
// 			const spectedResult: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "CeroCartasLevantadas",
// 				indexCardFlipA: null,
// 				indexCardFlipB: null,
// 				moves: 0,
// 			};

// 			// Assert
// 			expect(result).toEqual(spectedResult);
// 		});
// 	});

// 	describe("checkMatch specs", () => {
// 		it("Should return true if card id A and card id B are the same", () => {
// 			// Arrange
// 			const indexCardB = 1;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};
// 			// Act
// 			const result = checkMatch(indexCardB, board);

// 			// Assert
// 			expect(result).toEqual(true);
// 		});

// 		it("Should return false if card id A and card id B are not the same", () => {
// 			// Arrange
// 			const indexCardB = 1;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 2, imageUrl: "image2" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};
// 			// Act
// 			const result = checkMatch(indexCardB, board);

// 			// Assert
// 			expect(result).toEqual(false);
// 		});
// 	});

// 	describe("markSelectedPairCardAsMatched specs", () => {
// 		it("Should update card list with isFound true for card A and card B", () => {
// 			// Arrange
// 			const indexCardB = 1;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};
// 			// Act
// 			markSelectedPairCardAsMatched(indexCardB, board);
// 			const newBoard = getBoard();
// 			const spectedResult: Board = {
// 				cardList: [
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: true,
// 					},
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: true,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};

// 			// Assert
// 			expect(newBoard).toEqual(spectedResult);
// 		});
// 	});

// 	describe("resetSelectedPairCardsEngine specs", () => {
// 		it("Should update card list with isFlipped false for card A and card B", () => {
// 			// Arrange
// 			const indexCardB = 1;

// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 0, imageUrl: "image0" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};
// 			// Act
// 			resetSelectedPairCardsEngine(indexCardB, board);
// 			const newBoard = getBoard();
// 			const spectedResult: Board = {
// 				cardList: [
// 					{
// 						card: { id: 0, imageUrl: "image0" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: false,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};

// 			// Assert
// 			expect(newBoard).toEqual(spectedResult);
// 		});
// 	});

// 	describe("isGameFinished specs", () => {
// 		it("Should return false if there is a card with isFound false", () => {
// 			// Arrange
// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 0, imageUrl: "image0" },
// 						isFlipped: true,
// 						isFound: true,
// 					},
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: false,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};
// 			// Act
// 			const result = isGameFinished(board);

// 			// Assert
// 			expect(result).toEqual(false);
// 		});
// 		it("Should return true if all cards have isFound true", () => {
// 			// Arrange
// 			const board: Board = {
// 				cardList: [
// 					{
// 						card: { id: 0, imageUrl: "image0" },
// 						isFlipped: true,
// 						isFound: true,
// 					},
// 					{
// 						card: { id: 1, imageUrl: "image1" },
// 						isFlipped: true,
// 						isFound: true,
// 					},
// 				],
// 				statusGame: "DosCartasLevantadas",
// 				indexCardFlipA: 0,
// 				indexCardFlipB: 1,
// 				moves: 0,
// 			};
// 			// Act
// 			const result = isGameFinished(board);

// 			// Assert
// 			expect(result).toEqual(true);
// 		});
// 	});
// });
