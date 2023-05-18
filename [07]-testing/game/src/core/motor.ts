import { GameStatus, Game, CardValue } from './model';
import { cardImages, winningScore, maxCardValue, figureCardValue, sumForFigureCard } from './constants';

export const game: Game = {
  status: 'inProgress',
  playerScore: 0,
  message: '',
  card: {
    value: null,
    image: '',
  },
};

export const mapCardToCardValue = (value: number): CardValue =>
  value > maxCardValue ? (figureCardValue as CardValue) : (value as CardValue);

export const generateRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const checkGameResult = (): GameStatus => {
  if (game.playerScore === winningScore) {
    return (game.status = 'win');
  }
  if (game.playerScore > winningScore) {
    return (game.status = 'lose');
  }
  return 'inProgress';
};

export const getCardValue = (randomNumber: number): CardValue => {
  const cardValue =
    randomNumber > maxCardValue
      ? mapCardToCardValue(randomNumber + sumForFigureCard)
      : mapCardToCardValue(randomNumber);

  return cardValue;
};

export const updateGameStatus = (cardValue: CardValue, indexCard: number) => {
  game.playerScore = game.playerScore + cardValue;
  game.card.value = cardValue;
  game.card.image = cardImages.copas[indexCard];
};

export const stopOrderingCards = () => {
  switch (true) {
    case game.playerScore < 0.5:
      game.message = 'Al menos juega una carta cagón';
      break;
    case game.playerScore < 4:
      game.message = 'Has sido muy conservador';
      break;
    case game.playerScore < 6:
      game.message = 'Te ha entrado el canguelo eh?';
      break;
    case game.playerScore <= 7:
      game.message = 'Casi casi...';
      break;
    default:
      break;
  }
};

export const resetGame = () => {
  game.playerScore = 0;
  game.status = 'inProgress';
  game.message = '';
  game.card = {
    value: null,
    image: '',
  };
};
