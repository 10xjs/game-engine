import { getPlayerEntity } from '../accessors/local';
import { getKeyboard } from '../accessors/input';

import { moveEntity } from '../actions/entitiy';

import { UP, DOWN, LEFT, RIGHT } from '../input/key-codes'; 

export default function(state) {
  const actions = [];
  const playerEntity = getPlayerEntity(state);

  // parse input
  const keyboard = getKeyboard(state);
  const left = keyboard[LEFT];
  const right = keyboard[RIGHT];
  const up = keyboard[UP];
  const down = keyboard[DOWN];

  const playerDirection = getDirection({ left, right, up, down });

  // actions.push(setEntityOrientation(playerDirection));

  // move entities

  if (playerDirection.x || playerDirection.y) {
    actions.push(moveEntity({
      id: playerEntity.id,
      x: playerEntity.x + playerEntity.speed * playerDirection.x,
      y: playerEntity.y + playerEntity.speed * playerDirection.y,
    }));
  }

  // collide entities

  return actions;
}

function getDirection({ left, right, up, down }) {
  const x = (left ? -1 : 0) + (right ? 1 : 0);
  const y = (up ? -1 : 0) + (down ? 1 : 0);

  if ( x && y ) {
    return { x: x / Math.sqrt(2), y: y / Math.sqrt(2) };
  }
  return { x, y };
}
