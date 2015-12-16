import { MOVE } from './types';

export const move = ({ id, dx, dy }) => ({
  type: MOVE,
  payload: { id, dx, dy },
});
