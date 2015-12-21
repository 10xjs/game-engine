import { equals } from '../math-2d';

import {
  getEntity,
  getEntityPosition,
  getEntityVelocity,
} from '../accessors/entities';

import {
  SET_ENTITY_POSITION,
  SET_ENTITY_VELOCITY,
  CREATE_ENTITY,
  SET_ENTITY_DEBUG_STATE,
} from '../constants/actions';

// active && dynamic = player, npc, movable, block
// active && !dynamic = projectile, door, trigger area

export function createEntity(payload) {
  return  (dispatch, getState) => {
    return !getEntity(getState(), payload.id) ? dispatch({
      type: CREATE_ENTITY,
      payload,
    }) : null;
  };
}

export function setEntityPosition(id, position) {
  return (dispatch, getState) => {
    return !equals(getEntityPosition(getState(), id), position) ? dispatch({
      type: SET_ENTITY_POSITION,
      payload: { id, position },
    }) :  null;
  };
}

export function setEntityVelocity(id, velocity) {
  return (dispatch, getState) => {
    return !equals(getEntityVelocity(getState(), id), velocity) ? dispatch({
      type: SET_ENTITY_VELOCITY,
      payload: { id, velocity },
    }) : null;
  };
}

export const setEntityDebugState = (id, state) => ({
  type: SET_ENTITY_DEBUG_STATE,
  payload: { id, state },
});


