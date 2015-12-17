import { getEntity } from './entities';

export function getLocal(state) {
  return state.local;
}

export function getPlayerID(state) {
  return getLocal(state).playerID;
}

export function getPlayerEntity(state) {
  return getEntity(state, getPlayerID(state));
}
