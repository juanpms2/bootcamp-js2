import { mapCardToCardValue, elementReady } from './motor';

document.body.innerHTML = '<div id="test"></div>';

describe('motor specs', () => {
  describe('elementReady specs', () => {
    it('Should return a element when element exists and element is instaceof HTMLElement', () => {
      // Arrange
      const id = 'test';
      const element = document.createElement('div');
      element.setAttribute('id', id);
      document.body.appendChild(element);

      // Act
      const result = elementReady(id);

      // Assert
      expect(result).toEqual(element);
    });

    it('Should return null when element does not exist', () => {
      // Arrange
      const id = 'test2';

      // Act
      const result = elementReady(id);

      // Assert
      expect(result).toEqual(null);
    });
  });
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
