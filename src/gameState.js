const gameState = {
  current: "init",
  clock: 1,
  tick() {
    console.log(this.clock);
    this.clock++;
    return this.clock;
  },
  handleUserAction(icon) {
    console.log("handle", icon);
  },
};

export default gameState;
