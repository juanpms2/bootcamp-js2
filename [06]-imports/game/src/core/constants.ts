import { CardImages } from './model';

export const winningScore: number = 7.5;

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

export const restartButton = document.getElementById('restart-game');
export const modal = document.getElementById('modal');
export const modalContent = document.getElementById('message');
export const modalButton = document.getElementById('modal-button');
export const orderCardButton = document.getElementById('order-card');
export const stopOrderingButton = document.getElementById('stop-ordering');
export const orderOneMore = document.getElementById('order-one-more');
export const playerScore = document.getElementById('player-score');
export const playerCard = document.getElementById('card');
