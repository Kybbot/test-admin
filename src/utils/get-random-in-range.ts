/* eslint-disable import/prefer-default-export */
export const getRandomInRange = (min: number, max: number) => (
  Math.round(Math.random() * (max - min) + min));
