export function getStats(state) {
  return state.stats;
}

export function getFrameDurations(state) {
  return getStats(state).frameDurations;
}

export function getFrameCount(state) {
  return getStats(state).frameCount;
}

export function getFps(state, smoothing = 10) {
  const frameDurations = getFrameDurations(state);
  const samples = frameDurations.slice(-smoothing);
  const sum = samples.reduce((sum, duration) => {
    return sum + duration;
  }, 0);

  return sum ? samples.length * 1000 / sum : Infinity;
}
