import { combineReducers } from 'redux';
import omit from 'lodash.omit';

import { KEY_DOWN, KEY_UP } from '../actions/types';

// Reducers

const keyboard = (state = {}, action) => {
  const handlers = {
    [KEY_DOWN]: keyDown,
    [KEY_UP]: keyUp,
    default: state => state,
  };

  return (handlers[action.type] || handlers.default)(state, action);
};

// Action handlers

function keyDown(state, { payload: { keyCode, timeStamp } }) {
  if (state[keyCode]) {
    return state;
  }

  return {
    ...state,
    [keyCode]: timeStamp,
  };
}

function keyUp(state, { payload: { keyCode } }) {
  return omit(state, keyCode);
}

export default combineReducers({
  keyboard,
});
