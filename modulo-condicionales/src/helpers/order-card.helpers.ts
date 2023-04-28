import { cardsData, Card } from '../core/data';
import { openModal } from './modal.helpers';

let gameCards: Card[] = [...cardsData];
export const orderCardButton = document.querySelector('#order-card')!
export const stopOrderingButton = document.querySelector('#stop-ordering')!
export const orderOneMore = document.querySelector('#order-one-more')!

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

export const stopOrdering = (playerScore: number) => {
  switch (true) {
    case playerScore < 0.5:
      openModal('Al menos juega una carta cagón', true);
      break;
    case playerScore < 4:
      openModal('Has sido muy conservador', true);
      orderCardButton.setAttribute('disabled', 'true');
      stopOrderingButton.setAttribute('disabled', 'true');
      break;
    case playerScore < 6:
      openModal('Te ha entrado el canguelo eh?', true);
      orderCardButton.setAttribute('disabled', 'true');
      stopOrderingButton.setAttribute('disabled', 'true');
      break;
    case playerScore <= 7:
      openModal('Casi casi...', true);
      orderCardButton.setAttribute('disabled', 'true');
      stopOrderingButton.setAttribute('disabled', 'true');
      break;
    default:
      break;
  }
}




