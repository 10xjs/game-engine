export function getInput(state) {
  return state.input;
}

export function getKeyboard(state) {
  return getInput(state).keyboard;
}

export function getKeyboardKey(state, key) {
  return getKeyboard(state)[key];
}
