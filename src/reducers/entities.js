import {
  SET_ENTITY_POSITION,
  CREATE_ENTITY,
  SET_ENTITY_STATE,
} from '../actions/types';

export default (state = {}, action) => {
  const handlers = {
    [CREATE_ENTITY]: createEntity,
    [SET_ENTITY_POSITION]: setEntityPosition,
    [SET_ENTITY_STATE]: setEntityState,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

function createEntity(state, { payload }) {
  const { id, position, size, speed } = payload;

  return {
    ...state,
    [id]: { id, position, size, speed },
  };
}

function updateEntity(state, id, update) {
  return {
    ...state,
    [id]: {
      ...state[id],
      ...update,
    },
  };
}

function setEntityPosition(state, { payload: { id, position } }) {
  return updateEntity(state, id, { position });
}

function setEntityState(state, { payload }) {
  return updateEntity(state, payload.id, { state: payload.state });
}
