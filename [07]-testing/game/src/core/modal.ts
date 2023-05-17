import { elementReady } from './helpers';
import { GameStatus } from './model';

const modal = elementReady('modal');
const modalContent = elementReady('message');
const modalButton = elementReady('modal-button');

export const closeModal = () => {
  modal?.classList.remove('modal');
  modal?.classList.add('hidden');
};

export const openModal = (message: string, gameStatus: GameStatus) => {
  modalButton?.addEventListener('click', () => closeModal());

  if (modalContent) {
    gameStatus === 'inProgress'
      ? (modalContent.innerHTML = `<h3>${message}</h3>`)
      : (modalContent.innerHTML = `<h2>GAME OVER <br />${message}</h2>`);
  }

  modal?.classList.remove('hidden');
  modal?.classList.add('modal');
};
