import { combineReducers } from 'redux';
import { TOGGLE_DISPLAY_DEBUG } from '../constants/actions';

// -----------------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------------

const width = (state = 240) => {
  return state;
};

const height = (state = 160) => {
  return state;
};

const debug = (state = true, action) => {
  const handlers = {
    [TOGGLE_DISPLAY_DEBUG]: handleToggleDebug,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

// -----------------------------------------------------------------------------
// Action handlers
// -----------------------------------------------------------------------------

function handleToggleDebug(state) {
  return !state;
}

export default combineReducers({
  width,
  height,
  debug,
});
