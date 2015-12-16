import { STORE_FRAME_DURATION } from './types';

export const storeFrameDuration = duration => ({
  type: STORE_FRAME_DURATION,
  payload: duration,
});
