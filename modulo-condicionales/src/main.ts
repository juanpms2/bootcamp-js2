import "./style.css";

let playerScoreOne: number | string = 0;
const playerOne = document.querySelector('#player-one')!
const showScoreButton = document.querySelector('#show-score')!


const showScore = (puntuacion: number) => {
  if (puntuacion > 7.5) {
    playerScoreOne = 'Has perdido';
  } else {
    playerScoreOne = puntuacion;
  }
  return playerScoreOne;
};

showScoreButton.addEventListener('click', () => showScore(8));



playerOne.innerHTML = `

`;