import {
  SET_ENTITY_POSITION,
  SET_ENTITY_VELOCITY,
  CREATE_ENTITY,
  SET_ENTITY_DEBUG_STATE,
} from '../actions/types';

// active && solid = player, npc, movable, block
// active && !solid = projectile, door, trigger area,

export const createEntity = ({
  id,
  debug = {},
  position = { x: 0, y: 0 },
  size = { x: 16, y: 16 },
  speed = 1.125,
  active = false, // does the entity cause collisions
  solid = false, // does the entity stop other entities
  iMass = 0, // inverse mass ie 1 = 1, 2 = 0.5, 0 = infinify
}) => ({
  type: CREATE_ENTITY,
  payload: {
    id,
    debug,
    position,
    size,
    speed,
    active,
    solid,
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
