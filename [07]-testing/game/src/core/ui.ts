import {
  checkGameResult,
  game,
  generateRandomNumber,
  getCardValue,
  resetGame,
  stopOrderingCards,
  updateGameStatus,
} from './motor';
import { openModal } from './modal';
import { elementReady } from './helpers';
import { min, max } from './constants';

const restartButton = elementReady('restart-game');
const orderCardButton = elementReady('order-card');
const stopOrderingButton = elementReady('stop-ordering');
const orderOneMore = elementReady('order-one-more');
const playerScore = elementReady('player-score');
const playerCard = elementReady('card');

export const createGame = () => {
  const updateButtonStatus = () => {
    orderCardButton?.setAttribute('disabled', 'true');
    stopOrderingButton?.setAttribute('disabled', 'true');
  };

  const showScore = () => {
    if (playerScore) {
      playerScore.innerHTML = '';
      switch (game.status) {
        case 'lose':
          playerScore.innerHTML = `${game.playerScore} <span style="color:red"> You lose!!</span>`;
          openModal('You lose!!', game.status);
          break;
        case 'win':
          playerScore.innerHTML = `${game.playerScore} <span style="color:green"> You win!!</span>`;
          openModal('You win!!', game.status);
          break;
        default:
          playerScore.innerHTML = `${game.playerScore}`;
          break;
      }
    }
  };

  const addCard = () => {
    if (playerCard) {
      playerCard.innerHTML = `<img class="card" src="${game.card.image}" alt="card" />`;
    }
  };

  const orderCard = () => {
    const indexCard = generateRandomNumber(min, max);
    const cardValue = getCardValue(indexCard);
    updateGameStatus(cardValue, indexCard);

    if (game.playerScore) {
      checkGameResult();
    }

    if (game.playerScore) {
      showScore();
    }

    if (game.card.value) {
      addCard();
    }

    if (game.status === 'lose' || game.status === 'win') {
      updateButtonStatus();
    }
  };

  const stopOrdering = () => {
    stopOrderingCards();
    checkGameResult();
    orderCardButton?.classList.add('hidden');
    orderOneMore?.classList.remove('hidden');

    if (game.message === 'Al menos juega una carta cagón') {
      openModal('Al menos juega una carta cagón', game.status);
      orderCardButton?.classList.remove('hidden');
      orderOneMore?.classList.add('hidden');
    } else {
      openModal(game.message, game.status);
      updateButtonStatus();
    }
  };

  const restartPlayerData = () => {
    if (playerScore) {
      playerScore.innerHTML = '0';
    }
    if (playerCard) {
      playerCard.innerHTML = '<img class="card" src="/assets/back.svg" alt="card" />';
    }
  };

  const restartGame = () => {
    resetGame();
    restartPlayerData();
    orderOneMore?.classList.add('hidden');
    orderOneMore?.removeAttribute('disabled');
    orderCardButton?.classList.remove('hidden');
    orderCardButton?.removeAttribute('disabled');
    stopOrderingButton?.removeAttribute('disabled');
  };

  const handleOrderOneMore = () => {
    orderCard();
    orderOneMore?.setAttribute('disabled', 'true');
  };

  orderOneMore?.addEventListener('click', () => handleOrderOneMore());
  orderCardButton?.addEventListener('click', () => orderCard());
  restartButton?.addEventListener('click', () => restartGame());
  stopOrderingButton?.addEventListener('click', () => stopOrdering());
};
