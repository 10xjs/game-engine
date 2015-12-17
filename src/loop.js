export default (callback) => {
  const startTime = window.performance.now();
  let totalFrames = 0;
  let currentTime;

  function step() {
    window.requestAnimationFrame(newTime => {
      const frameDuration = currentTime ? (newTime - currentTime) : 0;
      const totalTime = newTime - startTime;
      currentTime = newTime;

      callback(frameDuration, totalTime, totalFrames);

      totalFrames ++;
      step();
    });
  }

  step();
};
