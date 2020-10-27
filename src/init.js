import gameState from "./gameState";
const TIME_GAP_MS = 3000;
let nextTick = Date.now();

function nextFrame() {
  const now = Date.now();
  if (nextTick <= now) {
    gameState.tick();
    nextTick = now + TIME_GAP_MS;
  }
  requestAnimationFrame(nextFrame);
}

requestAnimationFrame(nextFrame);
