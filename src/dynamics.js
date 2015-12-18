import { addScaled, subtract, add } from './math-2d';

// Returns the distance from a to b;
export function abbCollide(a, b) {
  const topA = addScaled(a.position, a.size, -0.5);
  const bottomA = add(topA, a.size);

  const topB = addScaled(b.position, b.size, -0.5);
  const bottomB = add(topB, b.size);

  const distA = subtract(bottomB,topA);
  const distB = subtract(topB, bottomA);
  return [ distA, distB ];
}

// Parse the result of abbCollide
export function isCollision([ distA, distB ], radius = 0) {
  // ax left, ay top, bx right, by bottom
  if (distA.x > radius && distB.x < radius) {
    if (distA.y > radius && distB.y < radius) {
      return true;
    }
  }
  return false;
}

export function resolveCollision([ distA, distB ]) {
 // result from a to b
  const x = Math.abs(distA.x) < Math.abs(distB.x) ? distA.x : distB.x;
  const y = Math.abs(distA.y) < Math.abs(distB.y) ? distA.y : distB.y;

  if (Math.abs(x) < Math.abs(y)) {
    return { x, y: 0 };
  } else {
    return { x: 0, y };
  }
}
