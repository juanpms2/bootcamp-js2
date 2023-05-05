import { modalButton, orderCardButton, orderOneMore, restartButton, stopOrderingButton } from './constants';
import { getRandomNumber } from './motor';
import { closeModal, orderCard, restartGame, stopOrdering } from './ui';

const handleOrderCard = () => {
  const cardNumber = getRandomNumber(0, 9);
  orderCard(cardNumber);
};

const handleOrderOneMore = () => {
  handleOrderCard();
  orderOneMore?.setAttribute('disabled', 'true');
};

document.addEventListener('DOMContentLoaded', () => {
  orderOneMore?.addEventListener('click', () => handleOrderOneMore());
  orderCardButton?.addEventListener('click', () => handleOrderCard());
  modalButton?.addEventListener('click', () => closeModal());
  restartButton?.addEventListener('click', () => restartGame());
  stopOrderingButton?.addEventListener('click', () => stopOrdering());
});
