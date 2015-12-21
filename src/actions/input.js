import { KEY_DOWN, KEY_UP } from '../constants/actions';
import { getKeyDown } from '../accessors/input';

export function keyDown({ keyCode, timeStamp, initial }) {
  return (dispatch, getState) => {
    return !getKeyDown(getState(), event.keyCode) ? dispatch({
      type: KEY_DOWN,
      payload: {
        keyCode,
        timeStamp,
        initial,
      },
    }) : null;
  };
}

export function keyUp({ keyCode }) {
  return (dispatch, getState) => {
    return getKeyDown(getState(), event.keyCode) ? dispatch({
      type: KEY_UP,
      payload: {
        keyCode,
      },
    }) : null;
  };
}
