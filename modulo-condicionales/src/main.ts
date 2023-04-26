import "./style.css";

enum figureCardEnum {
  AS = 1,
  DOS = 2,
  TRES = 3,
  CUATRO = 4,
  CINCO = 5,
  SEIS = 6,
  SIETE = 7,
  SOTA = 8,
  CABALLO = 9,
  REY = 10,
};

enum paloEnum {
  OROS = 1,
  COPAS = 2,
  ESPADAS = 3,
  BASTOS = 4,
};

let playerScoreOne: number = 0;
const playerOne = document.querySelector('#player-score-one')!
const orderCardButton = document.querySelector('#order-card')!
const orderedCards = document.querySelector('#ordered-cards')!


const getRandomInt = (min: number, max: number) => {
  const minimo = Math.ceil(min);
  const maximo = Math.floor(max);
  return Math.floor(Math.random() * (maximo - minimo)) + minimo;
};


const getRandomCard = () => {
  const palo: paloEnum = getRandomInt(1, 4);
  const card: figureCardEnum = getRandomInt(1, 10);
  playerScoreOne = playerScoreOne + card;
  showScore(playerScoreOne, palo, card);
  return card;
};


const showScore = (puntuacion: number, palo: paloEnum, figureCard: figureCardEnum) => {
  if (puntuacion > 7.5) {
    playerOne.innerHTML = `${puntuacion} Has perdido`;
    orderedCards.innerHTML = `<img class="card" src="/assets/${paloEnum[palo].toLowerCase()}/${figureCard}.svg" alt="ordered card" />`;
  } else {
    playerOne.innerHTML = puntuacion.toString();
    orderedCards.innerHTML = `<img class="card" src="/assets/${paloEnum[palo].toLowerCase()}/${figureCard}.svg" alt="ordered card" />`;
  }
  return playerScoreOne;
};

const orderCard = () => {
  const card = getRandomCard();
  return card;
};

orderCardButton.addEventListener('click', () => orderCard());


