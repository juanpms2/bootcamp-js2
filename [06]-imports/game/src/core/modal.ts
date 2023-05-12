import { modal, modalContent } from './constants';
import { GameStatus } from './model';

export const closeModal = () => {
  modal?.classList.remove('modal');
  modal?.classList.add('hidden');
};

export const openModal = (message: string, gameStatus: GameStatus) => {
  if (modalContent) {
    gameStatus === 'inProgress'
      ? (modalContent.innerHTML = `<h3>${message}</h3>`)
      : (modalContent.innerHTML = `<h2>GAME OVER <br />${message}</h2>`);
  }

  modal?.classList.remove('hidden');
  modal?.classList.add('modal');
};
