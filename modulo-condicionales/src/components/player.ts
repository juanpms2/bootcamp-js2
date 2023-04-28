import { openModal } from './modal';

interface PlayerData {
  htmlScoreElement: Element;
  htmlCardsElement: Element;
  score: number;
  cards: string[];
}

export const playerData: PlayerData = {
  htmlScoreElement: document.querySelector('#player-score-one')!,
  htmlCardsElement: document.querySelector('#ordered-cards')!,
  score: 0,
  cards: [],
};

export const showScore = () => {
  if (playerData.score > 7.5) {
    playerData.htmlScoreElement.innerHTML = `${playerData.score.toString()} <span style="color:red"> You louse </span>`;
    openModal('You louse!!');
  } else if (playerData.score === 7.5) {
    playerData.htmlScoreElement.innerHTML = `${playerData.score.toString()} <span style="color:green"> You win</span>`;
    openModal('You win!!');
  } else {
    playerData.htmlScoreElement.innerHTML = `${playerData.score.toString()}`;
  }
};

export const addCard = (url: string) => {
  playerData.cards.push(`<img class="card player-card" src="${url}" alt="ordered card" />`);
  playerData.htmlCardsElement.innerHTML = playerData.cards.map((card) => card).join('');
};