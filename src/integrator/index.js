import { getPlayerEntity, getPlayerId } from '../accessors/local';
import { getControlDirection } from '../accessors/input';
import { getEntitiesArray } from '../accessors/entities';

import { addScaled, scale, subtract, add } from '../math-2d';

import { setEntityPosition, setEntityState } from '../actions/entitiy';

export default function(state) {
  const actions = [];
  const playerEntity = getPlayerEntity(state);
  const playerId = getPlayerId(state);

  const positions = {};

  // parse input
  const controlDirection = getControlDirection(state);
  const { speed, position } = playerEntity;

  positions[playerId] = addScaled(position, controlDirection, speed);

  // move entities

  Object.keys(positions).forEach(id => {
    const position = positions[id];
    actions.push(setEntityPosition(id, position));
  });

  // collide entities

  const entities = getEntitiesArray(state);

  fold(entities, (a, b) => {

    if (abbCollide(a, b)) {
      actions.push(setEntityState(a.id, 'collision'));
      actions.push(setEntityState(b.id, 'collision'));
    } else {
      actions.push(setEntityState(a.id, ''));
      actions.push(setEntityState(b.id, ''));
    }

  });

  return actions;
}

function abbCollide(a, b, radius = 0) {
  const topA = addScaled(a.position, a.size, -0.5);
  const bottomA = add(topA, a.size);

  const topB = addScaled(b.position, b.size, -0.5);
  const bottomB = add(topB, b.size);

  const distA = subtract(bottomB, topA);
  const distB = subtract(bottomA, topB);

  if (distA.x < radius && distB.x < radius) {
    if (distA.y < radius && distB.y < radius) {
      return true;
    }
  }
  return false;
}

function fold(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      callback(array[i], array[j]);
    }
  }
}
