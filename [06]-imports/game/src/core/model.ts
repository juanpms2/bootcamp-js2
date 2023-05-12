export type GameStatus = 'win' | 'lose' | 'inProgress';
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0.5;
export type CardImages = {
  [key: string]: {
    [key: string]: string;
  };
};
export type StopOrderingMessages =
  | ''
  | 'Al menos juega una carta cagón'
  | 'Has sido muy conservador'
  | 'Te ha entrado el canguelo eh?'
  | 'Casi casi...';

interface Card {
  value: CardValue | null;
  image: string;
}

export interface Game {
  status: GameStatus;
  playerScore: number;
  message: StopOrderingMessages;
  card: Card;
}

export const winningScore: number = 7.5;
