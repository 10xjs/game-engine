import { combineReducers } from 'redux';
import { SET_PLAYER_ID } from '../actions/types';

// Reducers

const playerId = (state = '', action) => {
  const handlers = {
    [SET_PLAYER_ID]: setPlayerId,
    default: state => state,
  };

  return (handlers[action.type] || handlers.default)(state, action);
};

// Action handlers

function setPlayerId(state, { payload }) {
  return payload;
}

export default combineReducers({
  playerId,
});