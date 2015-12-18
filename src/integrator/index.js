import shuffle from 'lodash.shuffle';
import { getPlayerEntity } from '../accessors/local';
import { getControlDirection } from '../accessors/input';
import { getEntities, getActiveEntities  } from '../accessors/entities';

import { scale } from '../math-2d';

import {
  integrateVelocity,
  abbIntersect,
  isCollision,
  resolveCollision,
} from '../dynamics';

import {
  setEntityPosition,
  setEntityDebugState,
  setEntityVelocity,
} from '../actions/entitiy';

export default function({ getState, dispatch }) {
  clearEntityDebug(getEntities(getState()), dispatch);

  // Handle input
  const controlDirection = getControlDirection(getState());
  const player = getPlayerEntity(getState());

  setVelocityFromDirection(player, controlDirection, dispatch);

  // Integrate velocities
  integrateEntityVelocities(getActiveEntities(getState()), dispatch);

  // Collide entities
  collideEntities(getActiveEntities(getState()), dispatch);
}

function clearEntityDebug(entities, dispatch) {
  entities.forEach(({ id }) => {
    dispatch(setEntityDebugState(id, { collision: false }));
  });
}

function setVelocityFromDirection(entity, direction, dispatch) {
  const velocity = scale(direction, entity.speed);
  dispatch(setEntityVelocity(entity.id, velocity));
}

function integrateEntityVelocities(entities, dispatch) {
  entities.forEach(entity => {
    const newPosition = integrateVelocity(entity);
    dispatch(setEntityPosition(entity.id, newPosition));
  });
}

function collideEntities(entities, dispatch) {
  const collided = [];
  fold(shuffle(entities), (a, b) => {
    // non dynamic entites do not interact
    if (a.dynamic || b.dynamic) {
      const distAB = abbIntersect(a, b);

      if (isCollision(distAB)) {
        collided.push(a.id);
        collided.push(b.id);

        // a pair of dynamic entities can interact phcysically
        if (a.dynamic && b.dynamic) {
          const [ aPosition, bPosition ] = resolveCollision(a, b, distAB);
          dispatch(setEntityPosition(a.id, aPosition));
          dispatch(setEntityPosition(b.id, bPosition));
        }
      }
    }
  });

  collided.forEach(id => {
    dispatch(setEntityDebugState(id, { contact: true }));
  });
}

function fold(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      callback(array[i], array[j]);
    }
  }
}
