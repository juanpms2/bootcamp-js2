import { modalButton, orderCardButton, orderOneMore, restartButton, stopOrderingButton } from './core/constants';
import { restartGame, restartGameCards, restartPlayerData } from './core/motor';
import { closeModal, orderCard, stopOrdering } from './core/ui';
import './style.css';

const handleRestartGame = () => {
  restartGameCards();
  restartGame();
  restartPlayerData();
};

const handleOrderOneMore = () => {
  orderCard();
  orderOneMore?.setAttribute('disabled', 'true');
};

document.addEventListener('DOMContentLoaded', () => {
  orderOneMore?.addEventListener('click', () => handleOrderOneMore());
  orderCardButton?.addEventListener('click', () => orderCard());
  modalButton?.addEventListener('click', () => closeModal());
  restartButton?.addEventListener('click', () => restartGame());
  stopOrderingButton?.addEventListener('click', () => stopOrdering());
  restartButton?.addEventListener('click', () => handleRestartGame());
});
