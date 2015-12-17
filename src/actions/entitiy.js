import {
  SET_ENTITY_POSITION,
  CREATE_ENTITY,
  SET_ENTITY_STATE,
} from '../actions/types';

export const createEntity = ({
  id,
  position = { x: 0, y: 0 },
  size = { x: 16, y: 16 },
  speed = 1.125,
}) => ({
  type: CREATE_ENTITY,
  payload: {
    id,
    position,
    size,
    speed,
  },
});

export const setEntityPosition = (id, { x, y }) => ({
  type: SET_ENTITY_POSITION,
  payload: { id, position: { x, y } },
});

export const setEntityState = (id, state) => ({
  type: SET_ENTITY_STATE,
  payload: { id, state },
});
