import { CardImages } from './model';

export const winningScore: number = 7.5;
export const maxCardValue: number = 7;
export const figureCardValue: number = 0.5;
export const sumForFigureCard: number = 2;

export const cardImages: CardImages = {
  copas: {
    1: '/assets/copas/1.svg',
    2: '/assets/copas/2.svg',
    3: '/assets/copas/3.svg',
    4: '/assets/copas/4.svg',
    5: '/assets/copas/5.svg',
    6: '/assets/copas/6.svg',
    7: '/assets/copas/7.svg',
    10: '/assets/copas/10.svg',
    11: '/assets/copas/11.svg',
    12: '/assets/copas/12.svg',
  },
};

const elementInDOM = (id: string) => document.getElementById(id);

const elementReady = (id: string) => {
  const element = elementInDOM(id);
  if (element && element instanceof HTMLElement) {
    return element;
  }
  console.log(new Error(`Element with id ${id} not found in DOM`));
  return null;
};

export const restartButton = elementReady('restart-game');
export const orderCardButton = elementReady('order-card');
export const stopOrderingButton = elementReady('stop-ordering');
export const orderOneMore = elementReady('order-one-more');
export const playerScore = elementReady('player-score');
export const playerCard = elementReady('card');

export const modal = elementReady('modal');
export const modalContent = elementReady('message');
export const modalButton = elementReady('modal-button');
