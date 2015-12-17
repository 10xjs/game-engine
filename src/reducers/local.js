import { combineReducers } from 'redux';
import { SET_PLAYER_ID } from '../actions/types';

const playerID = (state = '', action) => {
  const handlers = {
    [SET_PLAYER_ID]: setPlayerID,
    default: state => state,
  };

  return (handlers[action.type] || handlers.default)(state, action);
};

function setPlayerID(state, { payload }) {
  return payload;
}

export default combineReducers({
  playerID,
});
