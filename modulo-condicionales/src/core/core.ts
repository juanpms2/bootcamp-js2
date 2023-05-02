import { cardsData, Card } from './data';
import { playerData, orderCardButton, stopOrderingButton, orderOneMore } from './constants';

let gameCards: Card[] = [...cardsData];


const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const getRandomCard = () => {
  const randomNumber = getRandomNumber(0, 39);
  const card = gameCards[randomNumber];
  gameCards.splice(randomNumber, 1);

  return card;
};

export const restartGameCards = () => {
  gameCards = [...cardsData];
};


export const restartGame = () => {
  orderOneMore?.classList.add('hidden');
  orderCardButton?.classList.remove('hidden');
  orderCardButton?.removeAttribute('disabled');
  stopOrderingButton?.removeAttribute('disabled');
}

export const restartPlayerData = () => {
  playerData.htmlScoreElement.innerHTML = '';
  playerData.htmlCardsElement.innerHTML = '';
  playerData.cards = [];
  playerData.score = 0;
}
