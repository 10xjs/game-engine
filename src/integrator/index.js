import { getPlayerSpeed, getPlayerEntityId, getPlayerEntity } from '../accessors/local';
import { getControlDirection, getKeyPressed } from '../accessors/input';
import { getDynamicsStateClone } from '../accessors/dynamics';

import { scale } from '../math-2d';

import {
  applyVelocities,
  resolveCollisions,
  isCollision,
  applyImpulses,
} from './dynamics';

import {
  setEntityPosition,
  setEntityVelocity,
  setEntityDebugState,
} from '../actions/entitiy';

import {
  toggleDisplayDebug,
} from '../actions/display';

import { KEY_CODE } from '../constants/input';

export default function({ getState, dispatch }) {
  // Update the game state from the current input.
  integrateInput(getState(), dispatch);

  // Move each entity by its velocity and run a single step of the collision
  // detector and resolver.
  integrateDynamics(getState(), dispatch, (a, b, distAB) => {
    if (isCollision(distAB)) {
      dispatch(setEntityDebugState(a.id, { contact: true }));
      dispatch(setEntityDebugState(b.id, { contact: true }));
    }
  });
}

function integrateInput(state, dispatch) {
  // Toggle display debug
  if (getKeyPressed(state, KEY_CODE.V)) {
    dispatch(toggleDisplayDebug());
  }

  // Apply character control.
  const id = getPlayerEntityId(state);
  const direction = getControlDirection(state);
  const playerSpeed = getPlayerSpeed(state);
  const velocity = scale(direction, playerSpeed);

  dispatch(setEntityVelocity(id, velocity));
}

function integrateDynamics(state, dispatch, handleCollision) {
  // Get a clone of the state of all of the dynamic entity values.
  const dynamicsState = getDynamicsStateClone(state);

  // The following function operate directly on and mutate the state.
  const { entities } = dynamicsState;

  // Move each entity by its velocity.
  applyVelocities(entities);

  // Detect collisions and create impulses.
  resolveCollisions(entities, handleCollision);

  // Move each enity by the average of all the impulses added in the collision
  // phase.
  applyImpulses(entities);

  entities.forEach(entity => {
    dispatch(setEntityPosition(entity.id, entity.position));
  });
}
