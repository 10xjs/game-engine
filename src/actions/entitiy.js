import { MOVE_ENTITY, CREATE_ENTITY } from './types';

export const createEntity = ({ id, x = 100, y = 100, speed = 1.125 }) => ({
  type: CREATE_ENTITY,
  payload: { id, x, y, speed },
});

export const moveEntity = ({ id, x, y }) => ({
  type: MOVE_ENTITY,
  payload: { id, x, y },
});
