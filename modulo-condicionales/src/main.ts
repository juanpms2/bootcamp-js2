import { openModal, getRandomCard, restartGameCards, orderCardButton, orderOneMore, stopOrdering, stopOrderingButton } from './helpers';
import "./style.css";

interface PlayerData {
  htmlScoreElement: Element;
  htmlCardsElement: Element;
  score: string;
  cards: string[];
}

let playerScoreOne: number = 0;
const restartButton = document.querySelector('#restart-game')!


const playerOneData: PlayerData = {
  htmlScoreElement: document.querySelector('#player-score-one')!,
  htmlCardsElement: document.querySelector('#ordered-cards')!,
  score: '',
  cards: [],
};



const showScore = (puntuacion: number) => {
  if (puntuacion > 7.5) {
    playerOneData.htmlScoreElement.innerHTML = `${puntuacion.toString()} <span style="color:red"> You louse </span>`;
    openModal('You louse!!');
  } else if (puntuacion === 7.5) {
    playerOneData.htmlScoreElement.innerHTML = `${puntuacion.toString()} <span style="color:green"> You win</span>`;
    openModal('You win!!');
  } else {
    playerOneData.htmlScoreElement.innerHTML = `${puntuacion.toString()}`;
  }
};

const addCard = (url: string) => {
  playerOneData.cards.push(`<img class="card player-card" src="${url}" alt="ordered card" />`);
  playerOneData.htmlCardsElement.innerHTML = playerOneData.cards.map((card) => card).join('');
};

const orderCard = () => {
  const card = getRandomCard();
  playerScoreOne = playerScoreOne + card.value;
  showScore(playerScoreOne);
  addCard(card.url);

  if (playerScoreOne >= 7.5) {
    orderCardButton.setAttribute('disabled', 'true');
    stopOrderingButton.setAttribute('disabled', 'true');
  }
}

orderCardButton.addEventListener('click', () => orderCard());



const restartGame = () => {
  restartGameCards();
  playerScoreOne = 0;
  playerOneData.htmlScoreElement.innerHTML = '';
  playerOneData.htmlCardsElement.innerHTML = '';
  playerOneData.cards = [];
  orderOneMore.classList.add('hidden');
  orderCardButton.classList.remove('hidden');
  orderCardButton.removeAttribute('disabled');
  stopOrderingButton.removeAttribute('disabled');
}

restartButton.addEventListener('click', () => restartGame());

const handleStopOrdering = () => {
  stopOrdering(playerScoreOne);
  orderCardButton.classList.add('hidden');
  orderOneMore.classList.remove('hidden');
}

stopOrderingButton.addEventListener('click', () => handleStopOrdering());

const handleOrderOneMore = () => {
  orderCard();
  orderOneMore.setAttribute('disabled', 'true');
}

orderOneMore.addEventListener('click', () => handleOrderOneMore());


