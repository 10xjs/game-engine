import { addScaled, subtractScaled, subtract, add } from './math-2d';

export function integrateVelocity({ position, velocity }) {
  return add(position, velocity);
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

export function getCollisionVector([ distA, distB ]) {
 // result from a to b
  const x = Math.abs(distA.x) < Math.abs(distB.x) ? distA.x : distB.x;
  const y = Math.abs(distA.y) < Math.abs(distB.y) ? distA.y : distB.y;

  if (Math.abs(x) < Math.abs(y)) {
    return { x, y: 0 };
  }
  return { x: 0, y };
}

export function resolveCollision(a, b, distAB) {
  const aMovable = a.iMass > 0 && !a.halted;
  const bMovable = b.iMass > 0 && !b.halted;

  if (aMovable || bMovable) {
    const resolve = getCollisionVector(distAB);

    if (aMovable && bMovable) {
      const totalIMass = a.iMass + b.iMass;
      const aFactor = a.iMass / totalIMass;
      const bFactor = b.iMass / totalIMass;

      const aPosition = addScaled(a.position, resolve, aFactor);
      const bPosition = subtractScaled(b.position, resolve, bFactor);

      return [ aPosition, bPosition ];
    } else if (aMovable) {
      return [ add(a.position, resolve), b.position ];
    } else if (bMovable) {
      return [ a.position, subtract(b.position, resolve) ];
    }

    return [ a.position, b.position ];
  }
}
