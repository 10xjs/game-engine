import values from 'lodash.values';

export function getEntity(state, id) {
  return state.entities[id];
}

export function getEntities(state) {
  return values(state.entities);
}

export function getActiveEntities(state) {
  return getEntities(state).filter(entity => entity.active);
}
