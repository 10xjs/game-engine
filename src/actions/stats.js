import { FRAME, TICK } from '../constants/actions';

export const frame = duration => ({
  type: FRAME,
  payload: duration,
});

export const tick = () => ({
  type: TICK,
});
