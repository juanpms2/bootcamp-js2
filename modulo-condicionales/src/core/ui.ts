import { getRandomCard, playerData, setPlayerCards, setPlayerScore } from './core';
import { winningScore, modal, modalContent, orderCardButton, stopOrderingButton, orderOneMore } from './constants';

export const closeModal = () => {
  modal?.classList.remove('modal');
  modal?.classList.add('hidden');
};

export const openModal = (message: string, isComment?: boolean) => {
  if (modalContent && modalContent instanceof HTMLDivElement) {
    isComment
      ? (modalContent.innerHTML = `<h3>${message}</h3>`)
      : (modalContent.innerHTML = `<h2>GAME OVER <br />${message}</h2>`);
  }

  if (modal && modal instanceof HTMLDivElement) {
    modal.classList.remove('hidden');
    modal.classList.add('modal');
  }
};

export const showScore = () => {
  if (playerData.score > winningScore) {
    playerData.htmlScoreElement.innerHTML = `${playerData.score.toString()} <span style="color:red"> You lose </span>`;
    openModal('You lose!!');
  } else if (playerData.score === winningScore) {
    playerData.htmlScoreElement.innerHTML = `${playerData.score.toString()} <span style="color:green"> You win</span>`;
    openModal('You win!!');
  } else {
    playerData.htmlScoreElement.innerHTML = `${playerData.score.toString()}`;
  }
};

export const addCard = (url: string) => {
  setPlayerCards(url);
  playerData.htmlCardsElement.innerHTML = playerData.cards.map(card => card).join('');
};

export const orderCard = () => {
  const card = getRandomCard();
  setPlayerScore(card.value);
  showScore();
  addCard(card.url);

  if (playerData.score >= winningScore) {
    orderCardButton?.setAttribute('disabled', 'true');
    stopOrderingButton?.setAttribute('disabled', 'true');
  }
};

const updateButtonStatus = () => {
  orderCardButton?.setAttribute('disabled', 'true');
  stopOrderingButton?.setAttribute('disabled', 'true');
};

export const stopOrdering = () => {
  orderCardButton?.classList.add('hidden');
  orderOneMore?.classList.remove('hidden');

  switch (true) {
    case playerData.score < 0.5:
      openModal('Al menos juega una carta cagón', true);
      orderCardButton?.classList.remove('hidden');
      orderOneMore?.classList.add('hidden');
      break;
    case playerData.score < 4:
      openModal('Has sido muy conservador', true);
      updateButtonStatus();
      break;
    case playerData.score < 6:
      openModal('Te ha entrado el canguelo eh?', true);
      updateButtonStatus();
      break;
    case playerData.score <= 7:
      openModal('Casi casi...', true);
      updateButtonStatus();
      break;
    default:
      break;
  }
};
