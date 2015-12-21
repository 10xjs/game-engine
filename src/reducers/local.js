import { combineReducers } from 'redux';
import { SET_PLAYER_ENTITY_ID } from '../constants/actions';

// -----------------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------------

const playerEntityId = (state = '', action) => {
  const handlers = {
    [SET_PLAYER_ENTITY_ID]: handleSetPlayerId,
    default: state => state,
  };

  return (handlers[action.type] || handlers.default)(state, action);
};

// -----------------------------------------------------------------------------
// Action handlers
// -----------------------------------------------------------------------------

function handleSetPlayerId(state, { payload }) {
  return payload;
}

export default combineReducers({
  playerEntityId,
});
