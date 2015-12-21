import { getEntity } from './entities';

export function getLocal(state) {
  return state.local;
}

export function getPlayerEntityId(state) {
  return getLocal(state).playerEntityId;
}

export function getPlayerEntity(state) {
  return getEntity(state, getPlayerEntityId(state));
}

export function getPlayerSpeed() {
  return 1.125;
}
