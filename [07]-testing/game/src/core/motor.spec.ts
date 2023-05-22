import { urlCardImages } from './constants';
import {
  mapCardToCardValue,
  checkGameResult,
  game,
  generateRandomNumber,
  getCardValue,
  updateGameStatus,
  stopOrderingCards,
  resetGame,
} from './motor';

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

  describe('generateRandonNumber specs', () => {
    it('Should return a number between min and max values', () => {
      // Arrange
      const min = 1;
      const max = 10;

      // Act
      const result = generateRandomNumber(min, max);

      // Assert
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });

  describe('checkGameResult specs', () => {
    it('Should game status be win if player score is equal to winning score', () => {
      // Arrange
      game.playerScore = 7.5;
      const expectedStatus = 'win';

      // Act
      const result = checkGameResult();

      // Assert
      expect(result).toEqual(expectedStatus);
    });

    it('Should game status be lose if player score is greater than winning score', () => {
      // Arrange
      game.playerScore = 8;
      const expectedStatus = 'lose';

      // Act
      const result = checkGameResult();

      // Assert
      expect(result).toEqual(expectedStatus);
    });

    it('Should game status be inProgress if player score is less than winning score', () => {
      // Arrange
      game.playerScore = 7;
      const expectedStatus = 'inProgress';

      // Act
      const result = checkGameResult();

      // Assert
      expect(result).toEqual(expectedStatus);
    });
  });

  describe('getCardNumber specs', () => {
    it('Should return the card value if card is less or equat than maxCardValue', () => {
      // Arrange
      const card = 1;
      const expectedValue = 1;

      // Act
      const result = getCardValue(card);

      // Assert
      expect(result).toEqual(expectedValue);
    });

    it('Should return the 0.5 if card is greater than maxCardValue', () => {
      // Arrange
      const card = 8;
      const expectedValue = 0.5;

      // Act
      const result = getCardValue(card);

      // Assert
      expect(result).toEqual(expectedValue);
    });
  });

  describe('updateGameStatus specs', () => {
    it('Should update game status', () => {
      // Arrange
      game.playerScore = 0;
      game.card.value = null;
      game.card.image = '';

      const cardValue = 0.5;
      const urlCardImage = urlCardImages.copas[10];

      // Act
      updateGameStatus(cardValue, urlCardImage);

      // Assert
      expect(game.card.value).toEqual(cardValue);
      expect(game.card.image).toEqual(urlCardImage);
      expect(game.playerScore).toEqual(cardValue);
    });
  });

  describe('stopOrderingCards specs', () => {
    it('should update game message to "Al menos juega una carta cagón" if player score is less 0.5', () => {
      // Arrange
      game.playerScore = 0;
      const expectedMessage = 'Al menos juega una carta cagón';

      // Act
      stopOrderingCards();

      // Assert
      expect(game.message).toEqual(expectedMessage);
    });

    it('should update game message to "Has sido muy conservador" if player score is less 4', () => {
      // Arrange
      game.playerScore = 3;
      const expectedMessage = 'Has sido muy conservador';

      // Act
      stopOrderingCards();

      // Assert
      expect(game.message).toEqual(expectedMessage);
    });

    it('should update game message to "Te ha entrado el canguelo eh?" if player score is less 6', () => {
      // Arrange
      game.playerScore = 5;
      const expectedMessage = 'Te ha entrado el canguelo eh?';

      // Act
      stopOrderingCards();

      // Assert
      expect(game.message).toEqual(expectedMessage);
    });

    it('should update game message to "Casi casi..." if player score is less or equal 7', () => {
      // Arrange
      game.playerScore = 7;
      const expectedMessage = 'Casi casi...';

      // Act
      stopOrderingCards();

      // Assert
      expect(game.message).toEqual(expectedMessage);
    });
  });

  describe('resetGame specs', () => {
    it('should reset game', () => {
      // Arrange
      game.playerScore = 7.5;
      game.status = 'win';
      game.message = 'Casi casi...';
      game.card = {
        value: 0.5,
        image: 'image',
      };

      // Act
      resetGame();

      // Assert
      expect(game.playerScore).toEqual(0);
      expect(game.status).toEqual('inProgress');
      expect(game.message).toEqual('');
      expect(game.card.value).toEqual(null);
      expect(game.card.image).toEqual('');
    });
  });
});
