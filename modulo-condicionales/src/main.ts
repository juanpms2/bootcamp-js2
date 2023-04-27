import { cardsData, Card } from './data';
import "./style.css";


interface PlayerData {
  htmlScoreElement: Element;
  htmlCardsElement: Element;
  score: string;
  cards: string[];
}

let gameCards: Card[] = [...cardsData];
let playerScoreOne: number = 0;
const orderCardButton = document.querySelector('#order-card')!
const restartButton = document.querySelector('#restart-game')!
const stopOrderingButton = document.querySelector('#stop-ordering')!

const playerOneData: PlayerData = {
  htmlScoreElement: document.querySelector('#player-score-one')!,
  htmlCardsElement: document.querySelector('#ordered-cards')!,
  score: '',
  cards: [],
};


const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomCard = () => {
  const randomNumber = getRandomNumber(0, 39);
  const card = gameCards[randomNumber];
  playerScoreOne = playerScoreOne + card.value;
  gameCards.splice(randomNumber, 1);
  showScore(playerScoreOne);
  addCard(card.url);

  if (playerScoreOne >= 7.5) {
    orderCardButton.setAttribute('disabled', 'true');
    stopOrderingButton.setAttribute('disabled', 'true');
  }
};



const showScore = (puntuacion: number) => {
  if (puntuacion > 7.5) {
    playerOneData.htmlScoreElement.innerHTML = `${puntuacion.toString()} <span style="color:red"> You louse </span>`;
  } else if (puntuacion === 7.5) {
    playerOneData.htmlScoreElement.innerHTML = `${puntuacion.toString()} <span style="color:green"> You win</span>`;
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
  return card;
};

orderCardButton.addEventListener('click', () => orderCard());



const restartGame = () => {
  gameCards = [...cardsData];
  playerScoreOne = 0;
  playerOneData.htmlScoreElement.innerHTML = '';
  playerOneData.htmlCardsElement.innerHTML = '';
  playerOneData.cards = [];
  orderCardButton.removeAttribute('disabled');
  stopOrderingButton.removeAttribute('disabled');
}

restartButton.addEventListener('click', () => restartGame());

const stopOrdering = () => {
  if (playerScoreOne >= 0.5) {
    orderCardButton.setAttribute('disabled', 'true');
  }
}

stopOrderingButton.addEventListener('click', () => stopOrdering());

