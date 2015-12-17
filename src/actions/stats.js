import { STORE_FRAME_DURATION, FRAME_COUNT } from './types';

export const storeFrameDuration = duration => ({
  type: STORE_FRAME_DURATION,
  payload: duration,
});

export const frameCount = () => ({
  type: FRAME_COUNT,
});
