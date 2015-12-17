import { UP, DOWN, LEFT, RIGHT, W, A, S, D } from '../input/key-codes';
import { normalize } from '../math-2d.js';

export function getInput(state) {
  return state.input;
}

export function getKeyboard(state) {
  return getInput(state).keyboard;
}

export function getKeyboardKey(state, key) {
  return getKeyboard(state)[key];
}

export function getControlDirection(state) {
  const keyboard = getKeyboard(state);
  const left = keyboard[LEFT] || keyboard[A];
  const right = keyboard[RIGHT] || keyboard[D];
  const up = keyboard[UP] || keyboard[W];
  const down = keyboard[DOWN] || keyboard[S];

  const x = (left ? -1 : 0) + (right ? 1 : 0);
  const y = (up ? -1 : 0) + (down ? 1 : 0);

  return normalize({ x, y });
}
