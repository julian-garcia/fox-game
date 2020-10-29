export const TICK_RATE = 3000;
export const ICN = Object.freeze({
  fish: "fish",
  poop: "poop",
  weather: "weather",
});
export const ICONS = [ICN.fish, ICN.poop, ICN.weather];

export const STATE = Object.freeze({
  init: "INIT",
  dead: "DEAD",
  hatching: "HATCHING",
  idling: "IDLING",
  sleep: "SLEEP",
  feeding: "FEEDING",
  hungry: "HUNGRY",
  celebrating: "CELEBRATING",
  pooping: "POOPING",
});

export const SCENES = ["day", "rain", "night"];
export const RAIN_CHANCE = 0.2;
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 4;

export const getNextHungerTime = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock;
export const getNextDieTime = (clock) =>
  Math.floor(Math.random() * 2) + 3 + clock;
export const getNextPoopTime = (clock) =>
  Math.floor(Math.random() * 3) + 4 + clock;
