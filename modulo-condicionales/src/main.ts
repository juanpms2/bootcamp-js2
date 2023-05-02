import { modalButton, orderCardButton, orderOneMore, restartButton, stopOrderingButton } from './core/constants';
import { restartGame, restartGameCards, restartPlayerData } from './core/core';
import { closeModal, orderCard, stopOrdering } from './core/ui';
import "./style.css";


document.addEventListener('DOMContentLoaded', () => {
  const handleRestartGame = () => {
    restartGameCards();
    restartGame();
    restartPlayerData();
  }



  const handleOrderOneMore = () => {
    orderCard();
    orderOneMore?.setAttribute('disabled', 'true');
  }

  orderOneMore?.addEventListener('click', () => handleOrderOneMore());
  orderCardButton?.addEventListener('click', () => orderCard());
  modalButton?.addEventListener('click', () => closeModal());
  restartButton?.addEventListener('click', () => restartGame());
  stopOrderingButton?.addEventListener('click', () => stopOrdering());
  restartButton?.addEventListener('click', () => handleRestartGame());
});







