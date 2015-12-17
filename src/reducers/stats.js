import { combineReducers } from 'redux';
import { STORE_FRAME_DURATION, FRAME_COUNT } from '../actions/types';

const frameDurations = (state = [], action) => {
  const handlers = {
    [STORE_FRAME_DURATION]: storeFrameDuration,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

function storeFrameDuration(state, { payload }) {
  return state.concat([ payload ]).slice(-100);
}

const frameCount = (state = 0, action) => {
  const handlers = {
    [FRAME_COUNT]: (state) => state + 1,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

export function fps(frameDurations, smoothing = 10) {
  const sum = frameDurations.slice(-smoothing).reduce((sum, duration) => {
    return sum + duration;
  }, 0);

  return smoothing * 1000 / sum;
}

export default combineReducers({
  frameDurations,
  frameCount,
});
