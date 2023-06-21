import { elementReady } from "./helpers";

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
});
