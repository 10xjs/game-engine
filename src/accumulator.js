export default class Accumulator {
  constructor() {
    this.time = 0;
  }

  run(dt, frameTime) {
    let iterations = 0;
    this.time += frameTime;

    while (this.time >= dt) {
      this.time -= dt;
      iterations ++;
    }

    return iterations;

  };
}
