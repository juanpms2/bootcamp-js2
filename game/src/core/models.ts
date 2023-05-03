export interface PlayerData {
  htmlScoreElement: HTMLElement;
  htmlCardsElement: HTMLElement;
  score: number;
  cards: string[];
}

export interface Card {
  suit: string;
  figure: string;
  value: number;
  url: string;
}
