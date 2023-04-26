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

interface PlayerData {
  htmlScoreElement: Element;
  htmlCardsElement: Element;
  score: string;
  cards: string[];
}

let playerScoreOne: number = 0;
const orderCardButton = document.querySelector('#order-card')!

const playerOneData: PlayerData = {
  htmlScoreElement: document.querySelector('#player-score-one')!,
  htmlCardsElement: document.querySelector('#ordered-cards')!,
  score: '',
  cards: [],
};


const getRandomInt = (min: number, max: number) => {
  const minimo = Math.ceil(min);
  const maximo = Math.floor(max);
  return Math.floor(Math.random() * (maximo - minimo)) + minimo;
};


const getRandomCard = () => {
  const palo: paloEnum = getRandomInt(1, 4);
  const card: figureCardEnum = getRandomInt(1, 10);
  playerScoreOne = card < 8 ? playerScoreOne + card : playerScoreOne + 0.5;
  showScore(playerScoreOne);
  addCard(palo, card);

  if (playerScoreOne > 7.5) {
    orderCardButton.setAttribute('disabled', 'true');
  }
};



const showScore = (puntuacion: number) => {
  playerOneData.htmlScoreElement.innerHTML = puntuacion > 7.5 ? `${puntuacion.toString()} Has perdido` : puntuacion.toString();

};

const addCard = (palo: paloEnum, figureCard: figureCardEnum) => {
  playerOneData.cards.push(`<img class="card player-card" src="/assets/${paloEnum[palo].toLowerCase()}/${figureCard}.svg" alt="ordered card" />`);
  playerOneData.htmlCardsElement.innerHTML = playerOneData.cards.map((card) => card).join('');
};

const orderCard = () => {
  const card = getRandomCard();
  return card;
};

orderCardButton.addEventListener('click', () => orderCard());


