import { MOVE_ENTITY, CREATE_ENTITY } from './types';

export const createEntity = ({ id, x = 0, y = 0 }) => ({
  type: CREATE_ENTITY,
  payload: { id, x, y },
});

export const moveEntity = ({ id, x, y }) => ({
  type: MOVE_ENTITY,
  payload: { id, x, y },
});
