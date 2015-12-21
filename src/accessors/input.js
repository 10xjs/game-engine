import { INPUT_METHOD, KEY_CODE } from '../constants/input';
import { normalize } from '../math-2d.js';

export function getInput(state) {
  return state.input;
}

export function getInputMethod() {
  return INPUT_METHOD.KEYBOARD;
}

export function getKeysDown(state) {
  return getInput(state).keysDown;
}

export function getKeyDown(state, key) {
  return getKeysDown(state)[key];
}

export function getKeysPressed(state) {
  return getInput(state).keysPressed;
}

export function getKeyPressed(state, key) {
  return getKeysPressed(state)[key];
}

export function getKeysDownDirection(state) {
  const keysDown = getKeysDown(state);
  const left = keysDown[KEY_CODE.LEFT] || keysDown[KEY_CODE.A];
  const right = keysDown[KEY_CODE.RIGHT] || keysDown[KEY_CODE.D];
  const up = keysDown[KEY_CODE.UP] || keysDown[KEY_CODE.W];
  const down = keysDown[KEY_CODE.DOWN] || keysDown[KEY_CODE.S];

  const x = (left ? -1 : 0) + (right ? 1 : 0);
  const y = (up ? -1 : 0) + (down ? 1 : 0);

  return normalize({ x, y });
}

export function getControlDirection(state) {
  switch (getInputMethod(state)) {
  case INPUT_METHOD.KEYBOARD:
  default:
    return getKeysDownDirection(state);
  }
}
