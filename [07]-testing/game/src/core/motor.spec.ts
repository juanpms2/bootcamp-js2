import { getRandomNumber, getValue } from './motor';

describe('motor specs', () => {
  describe('getRandomNumber specs', () => {
    it('Should return a number between min and max values', () => {
      // Arrange
      const min = 0;
      const max = 10;

      // Act
      const result = getRandomNumber(min, max);

      // Assert
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });

    it('Should return 1 if min and max are 1', () => {
      // Arrange
      const min = 1;
      const max = 1;

      // Act
      const result = getRandomNumber(min, max);

      // Assert
      expect(result).toBe(1);
    });
  });
  describe('getValue specs', () => {
    it('Should return value if value is less than 7', () => {
      // Arrange
      const value = 6;

      // Act
      const result = getValue(value);

      // Assert
      expect(result).toBe(value);
    });

    it('Should return 0.5 if value is greater than 7', () => {
      // Arrange
      const value = 8;

      // Act
      const result = getValue(value);

      // Assert
      expect(result).toBe(0.5);
    });
  });
});
