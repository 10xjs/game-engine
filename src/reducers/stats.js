import { combineReducers } from 'redux';
import { STORE_FRAME_DURATION, TICK } from '../actions/types';

// Reducers

const frameDurations = (state = [], action) => {
  const handlers = {
    [STORE_FRAME_DURATION]: storeFrameDuration,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

const time = (state = 0, action) => {
  const handlers = {
    [TICK]: (state) => state + 1,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

// Action handlers

function storeFrameDuration(state, { payload }) {
  return state.concat([ payload ]).slice(-100);
}

export default combineReducers({
  frameDurations,
  time,
});
