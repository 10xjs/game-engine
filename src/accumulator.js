export default function createAccumulator(dt) {
  let time = 0;

  return (frameTime) => {
    let iterations = 0;
    time += frameTime;

    while (time >= dt) {
      time -= dt;
      iterations ++;
    }

    return iterations;
  };
}
