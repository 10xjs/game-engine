import { combineReducers } from 'redux';
import { KEY_DOWN } from '../actions/types';
import { V } from '../input/key-codes';

const width = (state = 640) => {
  return state;
};

const height = (state = 480) => {
  return state;
};

const debug = (state = true, action) => {
  const handlers = {
    [KEY_DOWN]: keyDownDebug,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

function keyDownDebug(state, { payload: { keyCode, initial } }) {
  if (keyCode === V && initial) {
    return ! state;
  }
  return state;
}

export default combineReducers({
  width,
  height,
  debug,
});
