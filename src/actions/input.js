import { KEY_DOWN, KEY_UP } from './types';

export const keyDown = ({ keyCode, timeStamp }) => ({
  type: KEY_DOWN,
  payload: {
    keyCode,
    timeStamp,
  },
});

export const keyUp = ({ keyCode }) => ({
  type: KEY_UP,
  payload: {
    keyCode,
  },
});
