import { combineReducers } from 'redux';
import { STORE_FRAME_DURATION } from '../actions/types';

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

export function fps(frameDurations, smoothing = 10) {
  const sum = frameDurations.slice(-smoothing).reduce((sum, duration) => {
    return sum + duration;
  }, 0);

  return smoothing * 1000 / sum;
}

export default combineReducers({
  frameDurations,
});
