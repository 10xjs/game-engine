import {
  SET_ENTITY_POSITION,
  SET_ENTITY_VELOCITY,
  CREATE_ENTITY,
  SET_ENTITY_DEBUG_STATE,
} from '../actions/types';

// active && dynamic = player, npc, movable, block
// active && !dynamic = projectile, door, trigger area

export const createEntity = ({
  id,
  debug = {},
  position = { x: 0, y: 0 },
  velocity = { x: 0, y: 0 },
  size = { x: 16, y: 16 },
  speed = 1.125,
  active = false, // does the entity interact with other entities
  dynamic = false, // does the entity interact physicallt with other entities
  iMass = 0, // inverse mass
}) => ({
  type: CREATE_ENTITY,
  payload: {
    id,
    debug,
    position,
    velocity,
    size,
    speed,
    active,
    dynamic,
    iMass,
  },
});

export const setEntityPosition = (id, { x, y }) => ({
  type: SET_ENTITY_POSITION,
  payload: { id, position: { x, y } },
});

export const setEntityVelocity = (id, { x, y }) => ({
  type: SET_ENTITY_VELOCITY,
  payload: { id, velocity: { x, y } },
});

export const setEntityDebugState = (id, state) => ({
  type: SET_ENTITY_DEBUG_STATE,
  payload: { id, state },
});
