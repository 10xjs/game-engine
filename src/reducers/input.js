import { combineReducers } from 'redux';
import omit from 'lodash.omit';

import { KEY_DOWN, KEY_UP, TICK } from '../constants/actions';

// -----------------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------------

// State of all keys currently down.
const keysDown = (state = {}, action) => {
  const handlers = {
    [KEY_DOWN]: handleKeyDown,
    [KEY_UP]: handleKeyUp,
    default: state => state,
  };

  return (handlers[action.type] || handlers.default)(state, action);
};

// State of all keys pressed during the current integration tick.
const keysPressed = (state = {}, action) => {
  const handlers = {
    [KEY_DOWN]: handleKeyDown,
    [TICK]: handleTick,
    default: state => state,
  };

  return (handlers[action.type] || handlers.default)(state, action);
};

// -----------------------------------------------------------------------------
// Action handlers
// -----------------------------------------------------------------------------

function handleKeyDown(state, { payload: { keyCode, timeStamp } }) {
  if (state[keyCode]) {
    return state;
  }

  return {
    ...state,
    [keyCode]: timeStamp,
  };
}

function handleKeyUp(state, { payload: { keyCode } }) {
  return omit(state, keyCode);
}

function handleTick() {
  return {};
}

export default combineReducers({
  keysDown,
  keysPressed,
});
