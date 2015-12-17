import { getEntity } from './entities';

export function getLocal(state) {
  return state.local;
}

export function getPlayerId(state) {
  return getLocal(state).playerId;
}

export function getPlayerEntity(state) {
  return getEntity(state, getPlayerId(state));
}
