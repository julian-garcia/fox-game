import game from "./gameState";
import initButtons from "./button";
import { TICK_RATE } from "./constants";

initButtons(game.handleUserAction);

let nextTick = Date.now();

function nextFrame() {
  const now = Date.now();
  if (nextTick <= now) {
    game.tick();
    nextTick = now + TICK_RATE;
  }
  requestAnimationFrame(nextFrame);
}

requestAnimationFrame(nextFrame);
