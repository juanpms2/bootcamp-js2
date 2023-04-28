import { getRandomCard, restartGameCards, orderCardButton, orderOneMore, stopOrdering, stopOrderingButton, playerData, showScore, addCard } from './components';
import "./style.css";

const restartButton = document.querySelector('#restart-game')!



const orderCard = () => {
  const card = getRandomCard();
  playerData.score = playerData.score + card.value;
  showScore();
  addCard(card.url);

  if (playerData.score >= 7.5) {
    orderCardButton.setAttribute('disabled', 'true');
    stopOrderingButton.setAttribute('disabled', 'true');
  }
}

orderCardButton.addEventListener('click', () => orderCard());


const restartGame = () => {
  restartGameCards();
  playerData.htmlScoreElement.innerHTML = '';
  playerData.htmlCardsElement.innerHTML = '';
  playerData.cards = [];
  playerData.score = 0;
  orderOneMore.classList.add('hidden');
  orderCardButton.classList.remove('hidden');
  orderCardButton.removeAttribute('disabled');
  stopOrderingButton.removeAttribute('disabled');
}

restartButton.addEventListener('click', () => restartGame());

const handleStopOrdering = () => {
  stopOrdering(playerData.score);
  orderCardButton.classList.add('hidden');
  orderOneMore.classList.remove('hidden');
}

stopOrderingButton.addEventListener('click', () => handleStopOrdering());


const handleOrderOneMore = () => {
  orderCard();
  orderOneMore.setAttribute('disabled', 'true');
}

orderOneMore.addEventListener('click', () => handleOrderOneMore());


