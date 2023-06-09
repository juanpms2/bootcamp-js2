import './style.css';

const winningScore: number = 7.5;

const restartButton = document.getElementById('restart-game');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('message');
const modalButton = document.getElementById('modal-button');
const orderCardButton = document.getElementById('order-card');
const stopOrderingButton = document.getElementById('stop-ordering');
const orderOneMore = document.getElementById('order-one-more');
const playerScore = document.getElementById('score');
const playerCard = document.getElementById('card');

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const getCardValue = (value: number) => (value > 7 ? 0.5 : value);

let score = 0;

const updateButtonStatus = () => {
  orderCardButton?.setAttribute('disabled', 'true');
  stopOrderingButton?.setAttribute('disabled', 'true');
};

const getCard = (randomNumber: number): string => {
  switch (randomNumber) {
    case 1:
      return '<img class="card" src="/assets/copas/1.svg" alt="card" />';
    case 2:
      return '<img class="card" src="/assets/copas/2.svg" alt="card" />';
    case 3:
      return '<img class="card" src="/assets/copas/3.svg" alt="card" />';
    case 4:
      return '<img class="card" src="/assets/copas/4.svg" alt="card" />';
    case 5:
      return '<img class="card" src="/assets/copas/5.svg" alt="card" />';
    case 6:
      return '<img class="card" src="/assets/copas/6.svg" alt="card" />';
    case 7:
      return '<img class="card" src="/assets/copas/7.svg" alt="card" />';
    case 8:
      return '<img class="card" src="/assets/copas/10.svg" alt="card" />';
    case 9:
      return '<img class="card" src="/assets/copas/11.svg" alt="card" />';
    case 10:
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

const orderCard = () => {
  const cardNumber = getRandomNumber(1, 10);
  const card = getCard(cardNumber);
  const value = getCardValue(cardNumber);
  score = score + value;
  showScore();
  addCard(card);

  if (score >= winningScore) {
    updateButtonStatus();
  }
};

const stopOrdering = () => {
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

const restartPlayerData = () => {
  if (playerScore && playerScore instanceof HTMLElement) {
    playerScore.innerHTML = '0';
  }
  if (playerCard && playerCard instanceof HTMLElement) {
    playerCard.innerHTML = '<img class="card" src="/assets/back.svg" alt="card" />';
  }
  score = 0;
};

const restartGame = () => {
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
