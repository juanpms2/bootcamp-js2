import {
  winningScore,
  modal,
  modalContent,
  orderCardButton,
  stopOrderingButton,
  orderOneMore,
  playerScore,
  playerCard,
} from './constants';
import { getValue } from './motor';

let score: number = 0;

const getCard = (randomNumber: number): string => {
  switch (randomNumber) {
    case 0:
      return '<img class="card" src="/assets/copas/1.svg" alt="card" />';
    case 1:
      return '<img class="card" src="/assets/copas/2.svg" alt="card" />';
    case 2:
      return '<img class="card" src="/assets/copas/3.svg" alt="card" />';
    case 3:
      return '<img class="card" src="/assets/copas/4.svg" alt="card" />';
    case 4:
      return '<img class="card" src="/assets/copas/5.svg" alt="card" />';
    case 5:
      return '<img class="card" src="/assets/copas/6.svg" alt="card" />';
    case 6:
      return '<img class="card" src="/assets/copas/7.svg" alt="card" />';
    case 7:
      return '<img class="card" src="/assets/copas/10.svg" alt="card" />';
    case 8:
      return '<img class="card" src="/assets/copas/11.svg" alt="card" />';
    case 9:
      return '<img class="card" src="/assets/copas/12.svg" alt="card" />';
    default:
      return '<img class="card" src="/assets/back.svg" alt="card" />';
  }
};

export const closeModal = () => {
  modal?.classList.remove('modal');
  modal?.classList.add('hidden');
};

export const openModal = (message: string, isComment?: boolean) => {
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
    if (score > winningScore) {
      playerScore.innerHTML = `${score} <span style="color:red"> You lose!!</span>`;
      openModal('You lose!!');
    } else if (score === winningScore) {
      playerScore.innerHTML = `${score} <span style="color:green"> You win!!</span>`;
      openModal('You win!!');
    } else {
      playerScore.innerHTML = `${score}`;
    }
  }
};

const addCard = (card: string) => {
  if (playerCard && playerCard instanceof HTMLElement) {
    playerCard.innerHTML = card;
  }
};

const setPlayerScore = (newScore: number) => {
  score = score + newScore;
};

export const orderCard = (cardNumber: number) => {
  const card = getCard(cardNumber);
  const value = getValue(cardNumber + 1);
  setPlayerScore(value);
  showScore();
  addCard(card);

  if (score >= winningScore) {
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
    case score < 0.5:
      openModal('Al menos juega una carta cagón', true);
      orderCardButton?.classList.remove('hidden');
      orderOneMore?.classList.add('hidden');
      break;
    case score < 4:
      openModal('Has sido muy conservador', true);
      updateButtonStatus();
      break;
    case score < 6:
      openModal('Te ha entrado el canguelo eh?', true);
      updateButtonStatus();
      break;
    case score <= 7:
      openModal('Casi casi...', true);
      updateButtonStatus();
      break;
    default:
      break;
  }
};

export const restartPlayerData = () => {
  if (playerScore && playerScore instanceof HTMLElement) {
    playerScore.innerHTML = '0';
  }
  if (playerCard && playerCard instanceof HTMLElement) {
    playerCard.innerHTML = '<img class="card" src="/assets/back.svg" alt="card" />';
  }
  score = 0;
};

export const restartGame = () => {
  restartPlayerData();
  orderOneMore?.classList.add('hidden');
  orderCardButton?.classList.remove('hidden');
  orderCardButton?.removeAttribute('disabled');
  stopOrderingButton?.removeAttribute('disabled');
};
