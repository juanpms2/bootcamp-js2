import { elementReady, gameStateManagement } from "./helpers";

describe("helpers specs", () => {
	describe("elementReady specs", () => {
		beforeEach(() => {
			const element = document.createElement("div");
			element.setAttribute("id", "test");
			document.body.appendChild(element);
		});
		it("Should return null if element is not in the document", () => {
			// Arrange
			const id = "anotherId";

			// Act
			const result = elementReady(id);

			// Assert
			expect(result).toBeNull();
		});
		it("Should return element if element is instanceof HTMLElement and is in the document", () => {
			// Arrange
			const id = "test";
			const element = document.getElementById(id);

			// Act
			const result = elementReady(id);

			// Assert
			expect(result).toBeInstanceOf(HTMLElement);
			expect(result).toEqual(element);
		});
	});
	describe("gameStateManagement specs", () => {
		it("Should return a function that returns the initial state", () => {
			// Arrange
			const initialState = { a: 1, b: 2 };

			// Act
			const [getState] = gameStateManagement(initialState);

			// Assert
			expect(getState()).toEqual(initialState);
		});
		it("Should return a function that returns the new state", () => {
			// Arrange
			const initialState = { a: 1, b: 2 };
			const newState = { a: 2 };
			const expectedResult = { a: 2, b: 2 };

			// Act
			const [getState, setState] = gameStateManagement(initialState);
			setState(newState);
			const result = getState();

			// Assert
			expect(expectedResult).toEqual(result);
		});
	});
});
