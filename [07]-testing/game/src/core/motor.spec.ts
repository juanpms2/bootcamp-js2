import { mapCardToCardValue } from './motor';

describe('motor specs', () => {
  describe('mapCardToCardValue specs', () => {
    it('Should return card value if card is not a figure', () => {
      // Arrange
      const card = 1;
      const expectedValue = 1;

      // Act
      const result = mapCardToCardValue(card);

      // Assert
      expect(result).toEqual(expectedValue);
    });

    it('Should return figure value if card is a figure', () => {
      // Arrange
      const card = 10;
      const expectedValue = 0.5;

      // Act
      const result = mapCardToCardValue(card);

      // Assert
      expect(result).toEqual(expectedValue);
    });
  });
});
