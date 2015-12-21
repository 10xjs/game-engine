import { combineReducers } from 'redux';
import { FRAME, TICK } from '../constants/actions';

// -----------------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------------

const frameDurations = (state = [], action) => {
  const handlers = {
    [FRAME]: handleFrame,
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

// -----------------------------------------------------------------------------
// Action handlers
// -----------------------------------------------------------------------------

function handleFrame(state, { payload }) {
  return state.concat([ payload ]).slice(-100);
}

export default combineReducers({
  frameDurations,
  time,
});
