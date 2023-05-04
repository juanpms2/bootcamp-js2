export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getValue = (value: number) => (value > 7 ? 0.5 : value);
