import {
  SET_ENTITY_POSITION,
  SET_ENTITY_VELOCITY,
  CREATE_ENTITY,
  SET_ENTITY_DEBUG_STATE,
} from '../actions/types';

export default (state = {}, action) => {
  const handlers = {
    [CREATE_ENTITY]: createEntity,
    [SET_ENTITY_POSITION]: setEntityPosition,
    [SET_ENTITY_VELOCITY]: setEntityVelocity,
    [SET_ENTITY_DEBUG_STATE]: setEntityDebugState,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

function createEntity(state, { payload }) {
  const {
    id,
    debug,
    position,
    velocity,
    size,
    speed,
    active,
    solid,
    iMass,
  } = payload;

  return {
    ...state,
    [id]: {
      id,
      debug,
      position,
      velocity,
      size,
      speed,
      active,
      solid,
      iMass,
    },
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

function setEntityVelocity(state, { payload: { id, velocity } }) {
  return updateEntity(state, id, { velocity });
}

function setEntityDebugState(state, { payload }) {
  return updateEntity(state, payload.id, { debug: payload.state });
}
