import {
  SET_ENTITY_POSITION,
  SET_ENTITY_VELOCITY,
  CREATE_ENTITY,
  SET_ENTITY_DEBUG_STATE,
  FRAME,
} from '../constants/actions';

// -----------------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------------

export default (state = {}, action) => {
  const handlers = {
    [CREATE_ENTITY]: handleCreateEntity,
    [SET_ENTITY_POSITION]: handleSetEntityPosition,
    [SET_ENTITY_VELOCITY]: handleSetEntityVelocity,
    [SET_ENTITY_DEBUG_STATE]: handleSetEntityDebugState,
    [FRAME]: handleFrame,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

// -----------------------------------------------------------------------------
// Action Handlers
// -----------------------------------------------------------------------------

function handleCreateEntity(state, { payload }) {
  const {
    id,
    debug = {},
    position = { x: 0, y: 0 },
    velocity = { x: 0, y: 0 },
    size = { x: 16, y: 16 },
    active = false, // does the entity interact with other entities
    dynamic = false, // does the entity interact physicallt with other entities
    iMass = 0, // inverse mass
  } = payload;

  return {
    ...state,
    [id]: {
      id,
      debug,
      position,
      velocity,
      size,
      active,
      dynamic,
      iMass,
    },
  };
}

function handleSetEntityPosition(state, { payload }) {
  const { id, position: { x, y } } = payload;
  return updateEntity(state, id, { position: { x, y } });
}

function handleSetEntityVelocity(state, { payload }) {
  const { id, velocity: { x, y } } = payload;
  return updateEntity(state, id, { velocity: { x, y } });
}

function handleSetEntityDebugState(state, { payload }) {
  return updateEntity(state, payload.id, { debug: payload.state });
}

function handleFrame(state) {
  return updateEntities(state, { debug: {} });
}

// Helpers

function updateEntity(state, id, update) {
  return {
    ...state,
    [id]: {
      ...state[id],
      ...update,
    },
  };
}

function updateEntities(state, update) {
  return Object.keys(state).reduce((reduced, id) => {
    reduced[id] = {
      ...state[id],
      ...update,
    };
    return reduced;
  }, {});
}
