const gameState = {
  current: "init",
  clock: 1,
  tick() {
    console.log(this.clock);
    this.clock++;
    return this.clock;
  },
};

export default gameState;
