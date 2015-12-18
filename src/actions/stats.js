import { STORE_FRAME_DURATION, TICK } from './types';

export const storeFrameDuration = duration => ({
  type: STORE_FRAME_DURATION,
  payload: duration,
});

export const tick = () => ({
  type: TICK,
});
