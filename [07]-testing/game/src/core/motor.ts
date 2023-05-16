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

const elementInDOM = (id: string) => document.getElementById(id);

export const elementReady = (id: string) => {
  const element = elementInDOM(id);
  if (element && element instanceof HTMLElement) {
    return element;
  }
  console.log(new Error(`Element with id ${id} not found in DOM`));
  return null;
};

export const mapCardToCardValue = (value: number): CardValue =>
  value > maxCardValue ? (figureCardValue as CardValue) : (value as CardValue);

const generateRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomCard = () => {
  const randomNumber = generateRandomNumber(1, 10);

  if (randomNumber > 7) {
    const numberCard = randomNumber + sumForFigureCard;

    game.card.value = mapCardToCardValue(numberCard);
    game.card.image = cardImages.copas[numberCard];
  } else {
    game.card.value = mapCardToCardValue(randomNumber);
    game.card.image = cardImages.copas[randomNumber];
  }
  calculateScore(game.card.value);
};

const checkGameResult = (): GameStatus => {
  if (game.playerScore === winningScore) {
    return (game.status = 'win');
  }
  if (game.playerScore > winningScore) {
    return (game.status = 'lose');
  }
  return 'inProgress';
};

export const calculateScore = (cardValue: number) => {
  game.playerScore = game.playerScore + cardValue;
  checkGameResult();
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
  checkGameResult();
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
