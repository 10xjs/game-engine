export default (callback) => {
  let currentTime;

  function step() {
    window.requestAnimationFrame(newTime => {
      const frameDuration = currentTime ? (newTime - currentTime) : 0;
      currentTime = newTime;

      callback(frameDuration);

      step();
    });
  }

  step();
};
