import {
  ICN,
  STATE,
  SCENES,
  RAIN_CHANCE,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  getNextPoopTime,
} from "./constants";
import { modFox, modScene, togglePoopBag, getCurrentScene } from "./ui";

const gameState = {
  current: STATE.init,
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  startCelebratingTime: -1,
  endCelebratingTime: -1,
  poopTime: -1,
  tick() {
    this.clock++;
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.startCelebratingTime) {
      this.startCelebrating();
    } else if (this.clock === this.endCelebratingTime) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    }
    return this.clock;
  },
  startGame() {
    this.current = STATE.hatching;
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene(getCurrentScene());
  },
  wake() {
    this.current = STATE.idling;
    this.wakeTime = -1;
    const currentSceneIndex = getCurrentScene() === "day" ? 0 : 2;
    this.scene = Math.random() > RAIN_CHANCE ? currentSceneIndex : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
    this.determineFoxState();
  },
  sleep() {
    this.current = STATE.sleep;
    modFox("sleep");
    modScene("night");
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = STATE.hungry;
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  startCelebrating() {
    this.current = STATE.celebrating;
    this.startCelebratingTime = -1;
    this.endCelebratingTime = this.clock + 2;
    modFox("celebrate");
  },
  endCelebrating() {
    this.endCelebratingTime = -1;
    this.current = STATE.idling;
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current === STATE.idling) {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
  handleUserAction(icon) {
    if (
      [STATE.sleep, STATE.feeding, STATE.celebrating].includes(this.current)
    ) {
      return;
    }

    if ([STATE.init, STATE.dead].includes(this.current)) {
      this.startGame();
      return;
    }

    switch (icon) {
      case ICN.weather:
        this.changeWeather();
        break;
      case ICN.poop:
        this.cleanUp();
        break;
      case ICN.fish:
        this.feed();
        break;
    }
  },
  changeWeather() {
    getCurrentScene();
    if (getCurrentScene() === "day") {
      modScene("night");
    } else if (getCurrentScene() === "night") {
      modScene("day");
    }
  },
  feed() {
    if (this.current !== STATE.hungry) return;
    this.current = STATE.feeding;
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox("eating");
    this.startCelebratingTime = this.clock + 2;
  },
  poop() {
    this.current = STATE.pooping;
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
  cleanUp() {
    if (this.current !== STATE.pooping) return;
    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungerTime(this.clock);
  },
  die() {
    this.current = STATE.dead;
    modFox("dead");
    modScene("dead");
    this.clearTimes;
  },
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.startCelebratingTime = -1;
    this.endCelebratingTime = -1;
  },
};

export default gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
