export function getDisplay(state) {
  return state.display;
}

export function getDisplayWidth(state) {
  return getDisplay(state).width;
}

export function getDisplayHeight(state) {
  return getDisplay(state).height;
}

export function getDisplayDebug(state) {
  return getDisplay(state).debug;
}
