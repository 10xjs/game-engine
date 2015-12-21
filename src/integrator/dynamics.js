import shuffle from 'lodash.shuffle';
import { fold } from '../util';
import { addScaled, scale, subtract, add, average } from '../math-2d';

export function getEntityVelocity(entity, direction) {
  return scale(direction, entity.speed);
}

export function applyVelocities(entities) {
  entities.forEach(entity => {
    add(entity.position, entity.velocity, entity.position);
  });
}

export function resolveCollisions(entities, handleCollision = () => true) {
  fold(shuffle(entities), (a, b) => {
    // non dynamic entites do not interact
    if (a.dynamic || b.dynamic) {
      const distAB = abbIntersect(a, b);

      if (handleCollision(a, b, distAB) !== false && isCollision(distAB)) {
        // a pair of dynamic entities can interact physically
        if (a.dynamic && b.dynamic) {
          resolveCollision(a, b, distAB);
        }
      }
    }
  });
}

export function abbIntersect(a, b) {
  const topA = addScaled(a.position, a.size, -0.5);
  const bottomA = add(topA, a.size);

  const topB = addScaled(b.position, b.size, -0.5);
  const bottomB = add(topB, b.size);

  const distA = subtract(bottomB, topA);
  const distB = subtract(topB, bottomA);
  return [ distA, distB ];
}

export function isCollision([ distA, distB ], radius = 0) {
  // ax left, ay top, bx right, by bottom
  if (distA.x > radius && distB.x < radius) {
    if (distA.y > radius && distB.y < radius) {
      return true;
    }
  }
  return false;
}

export function resolveCollision(a, b, distAB) {
  const aFactor = a.halted ? 0 : a.iMass;
  const bFactor = b.halted ? 0 : b.iMass;

  const aMovable = aFactor > 0;
  const bMovable = bFactor > 0;

  if (aMovable || bMovable) {
    const resolve = getCollisionVector(distAB);

    if (aMovable) {
      const impulse = scale(resolve, aFactor / (aFactor + bFactor));
      a.impulses.push(impulse);
    }

    if (bMovable) {
      const impulse = scale(resolve, bFactor / (aFactor + bFactor) * -1);
      b.impulses.push(impulse);
    }
  }
}

export function getCollisionVector([ distA, distB ]) {
 // result from a to b
  const x = Math.abs(distA.x) < Math.abs(distB.x) ? distA.x : distB.x;
  const y = Math.abs(distA.y) < Math.abs(distB.y) ? distA.y : distB.y;

  if (Math.abs(x) < Math.abs(y)) {
    return { x, y: 0 };
  }
  return { x: 0, y };
}

export function applyImpulses(entities) {
  entities.forEach(entity => {
    add(entity.position, average(entity.impulses), entity.position);
    entity.impulses.length = 0;
  });
}
