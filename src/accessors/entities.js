import values from 'lodash.values';

export function getEntities(state) {
  return state.entities;
}

export function getEntitiesArray(state) {
  return values(getEntities(state));
}
