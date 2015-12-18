import { getPlayerEntity, getPlayerId } from '../accessors/local';
import { getControlDirection } from '../accessors/input';
import { getEntitiesArray } from '../accessors/entities';

import { addScaled, add, subtract } from '../math-2d';
import { abbCollide, isCollision, resolveCollision } from '../dynamics';

import { setEntityPosition, setEntityDebugState } from '../actions/entitiy';

let index = 0;

export default function({ getState, dispatch }) {
  // const actions = [];
  const playerId = getPlayerId(getState());
  const playerEntity = getPlayerEntity(getState());
  getEntitiesArray(getState())
    .forEach(({ id }) => dispatch(setEntityDebugState(id, {
      collision: false,
    })));

  const positions = {};

  // parse input
  const controlDirection = getControlDirection(getState());
  const { speed, position } = playerEntity;

  positions[playerId] = addScaled(position, controlDirection, speed);

  // move entities
  Object.keys(positions).forEach(id => {
    const position = positions[id];
    dispatch(setEntityPosition(id, position));
  });

  // collide entities
  const activeEntities = getEntitiesArray(getState())
    .filter(entity => entity.active);

  fold(activeEntities, (a, b) => {
    const distAB = abbCollide(a, b);

    if (isCollision(distAB)) {
      dispatch(setEntityDebugState(a.id, {
        collision: true,
      }));

      dispatch(setEntityDebugState(b.id, {
        collision: true,
      }));

      if (a.solid && b.solid) {
        const resolve = resolveCollision(distAB);

        dispatch(setEntityPosition(a.id, add(a.position, resolve)));
        // dispatch(setEntityPosition(b.id, subtract(b.position, resolve)));
        // debugger;
      }
    }
  });

  index ++;
}


function fold(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      callback(array[i], array[j]);
    }
  }
}
