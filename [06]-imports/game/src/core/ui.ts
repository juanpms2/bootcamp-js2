import {
  modal,
  modalContent,
  orderCardButton,
  stopOrderingButton,
  orderOneMore,
  playerScore,
  playerCard,
  modalButton,
  restartButton,
} from './constants';
import { game, generateRandomCard, resetGame, stopOrderingCards } from './motor';

export const createGame = () => {
  const updateButtonStatus = () => {
    orderCardButton?.setAttribute('disabled', 'true');
    stopOrderingButton?.setAttribute('disabled', 'true');
  };

  const closeModal = () => {
    modal?.classList.remove('modal');
    modal?.classList.add('hidden');
  };

  const openModal = (message: string, isComment?: boolean) => {
    if (modalContent && modalContent instanceof HTMLElement) {
      isComment
        ? (modalContent.innerHTML = `<h3>${message}</h3>`)
        : (modalContent.innerHTML = `<h2>GAME OVER <br />${message}</h2>`);
    }

    modal?.classList.remove('hidden');
    modal?.classList.add('modal');
  };

  const showScore = () => {
    if (playerScore && playerScore instanceof HTMLElement) {
      playerScore.innerHTML = '';
      switch (game.status) {
        case 'lose':
          playerScore.innerHTML = `${game.playerScore} <span style="color:red"> You lose!!</span>`;
          openModal('You lose!!');
          break;
        case 'win':
          playerScore.innerHTML = `${game.playerScore} <span style="color:green"> You win!!</span>`;
          openModal('You win!!');
          break;
        default:
          playerScore.innerHTML = `${game.playerScore}`;
          break;
      }
    }
  };

  const addCard = () => {
    if (playerCard && playerCard instanceof HTMLElement) {
      playerCard.innerHTML = `<img class="card" src="${game.card.image}" alt="card" />`;
    }
  };

  const orderCard = () => {
    generateRandomCard();
    showScore();
    addCard();

    if (game.status === 'lose' || game.status === 'win') {
      updateButtonStatus();
    }
  };

  const stopOrdering = () => {
    stopOrderingCards();
    orderCardButton?.classList.add('hidden');
    orderOneMore?.classList.remove('hidden');

    if (game.message === 'Al menos juega una carta cagón') {
      openModal('Al menos juega una carta cagón', true);
      orderCardButton?.classList.remove('hidden');
      orderOneMore?.classList.add('hidden');
    } else {
      openModal(game.message, true);
      updateButtonStatus();
    }
  };

  const restartPlayerData = () => {
    if (playerScore && playerScore instanceof HTMLElement) {
      playerScore.innerHTML = '0';
    }
    if (playerCard && playerCard instanceof HTMLElement) {
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
  modalButton?.addEventListener('click', () => closeModal());
  restartButton?.addEventListener('click', () => restartGame());
  stopOrderingButton?.addEventListener('click', () => stopOrdering());
};
