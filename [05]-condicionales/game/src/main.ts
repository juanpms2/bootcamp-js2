import './style.css';

const winningScore: number = 7.5;

const restartButton = document.querySelector('#restart-game');
const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content #message');
const modalButton = document.querySelector('#modal button');
const orderCardButton = document.querySelector('#order-card');
const stopOrderingButton = document.querySelector('#stop-ordering');
const orderOneMore = document.querySelector('#order-one-more');
const playerScore = document.querySelector('#score');
const playerCard = document.querySelector('#card');

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const getValue = (value: number) => (value > 7 ? 0.5 : value);

const player = {
  score: 0,
};

const setPlayer = (newScore: number) => {
  player.score = player.score + newScore;
};

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
    if (player.score > winningScore) {
      playerScore.innerHTML = `${player.score} <span style="color:red"> You lose!!</span>`;
      openModal('You lose!!');
    } else if (player.score === winningScore) {
      playerScore.innerHTML = `${player.score} <span style="color:green"> You win!!</span>`;
      openModal('You win!!');
    } else {
      playerScore.innerHTML = `${player.score}`;
    }
  }
};

const addCard = (card: string) => {
  if (playerCard && playerCard instanceof HTMLElement) {
    playerCard.innerHTML = card;
  }
};

const orderCard = (cardNumber: number) => {
  const card = getCard(cardNumber);
  const value = getValue(cardNumber + 1);
  setPlayer(value);
  showScore();
  addCard(card);

  if (player.score >= winningScore) {
    orderCardButton?.setAttribute('disabled', 'true');
    stopOrderingButton?.setAttribute('disabled', 'true');
  }
};

const updateButtonStatus = () => {
  orderCardButton?.setAttribute('disabled', 'true');
  stopOrderingButton?.setAttribute('disabled', 'true');
};

const stopOrdering = () => {
  orderCardButton?.classList.add('hidden');
  orderOneMore?.classList.remove('hidden');

  switch (true) {
    case player.score < 0.5:
      openModal('Al menos juega una carta cagón', true);
      orderCardButton?.classList.remove('hidden');
      orderOneMore?.classList.add('hidden');
      break;
    case player.score < 4:
      openModal('Has sido muy conservador', true);
      updateButtonStatus();
      break;
    case player.score < 6:
      openModal('Te ha entrado el canguelo eh?', true);
      updateButtonStatus();
      break;
    case player.score <= 7:
      openModal('Casi casi...', true);
      updateButtonStatus();
      break;
    default:
      break;
  }
};

const restartPlayerData = () => {
  if (playerScore && playerScore instanceof HTMLElement) {
    playerScore.innerHTML = '0';
  }
  if (playerCard && playerCard instanceof HTMLElement) {
    playerCard.innerHTML = '<img class="card" src="/assets/back.svg" alt="card" />';
  }
  setPlayer(0);
};

const restartGame = () => {
  restartPlayerData();
  orderOneMore?.classList.add('hidden');
  orderCardButton?.classList.remove('hidden');
  orderCardButton?.removeAttribute('disabled');
  stopOrderingButton?.removeAttribute('disabled');
};

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
