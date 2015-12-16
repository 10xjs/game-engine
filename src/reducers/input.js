import { combineReducers } from 'redux';
import omit from 'lodash.omit';

import { KEY_DOWN, KEY_UP } from '../actions/types';

const keyboard = (state = {}, action) => {
  const handlers = {
    [KEY_DOWN]: keyDown,
    [KEY_UP]: keyUp,
    default: state => state,
  };

  return (handlers[action.type] || handlers.default)(state, action);
};

function keyDown(state, { payload: { keyCode, time } }) {
  return {
    ...state,
    [keyCode]: time,
  };
}

function keyUp(state, { payload: { keyCode } }) {
  return omit(state, keyCode);
}

export default combineReducers({
  keyboard,
});
