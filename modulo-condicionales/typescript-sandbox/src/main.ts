import "./style.css";

const app = document.querySelector<HTMLDivElement>('#app')!

let playerScoreOne = 0;

const showScore = (puntuacion: number) => {
  if (puntuacion > 7.5) {
    return 'Has perdido';
  } else {
    return puntuacion;
  }
};


app.innerHTML = `
  <h1>Juego de las 7 y media</h1>
  <div id="player-one" class="player">${showScore(playerScoreOne)}</div>
  <img src="/assets/back.svg" alt="back card" />
  <button id="getCard">Pedir carta</button>
`
