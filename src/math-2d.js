import { PropTypes } from 'react';

export function copy({ x, y }) {
  return { x, y };
}

export function equals(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function add(a, b, out = {}) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
  return out;
}

export function subtract(a, b, out = {}) {
  out.x = a.x - b.x;
  out.y = a.y - b.y;
  return out;
}

export function scale(v, s, out = {}) {
  out.x = v.x * s;
  out.y = v.y * s;
  return out;
}

export function addScaled(a, b, s, out = {}) {
  out.x = a.x + b.x * s;
  out.y = a.y + b.y * s;
  return out;
}

export function subtractScaled(a, b, s, out = {}) {
  out.x = a.x - b.x * s;
  out.y = a.y - b.y * s;
  return out;
}

export function average(vectors, out = {}) {
  out.x = 0;
  out.y = 0;

  if (vectors.length) {
    vectors.reduce((reduced, v) => add(reduced, v, out), out);
    scale(out, 1 / vectors.length, out);
  }

  return out;
}

export function lengthSquared(v) {
  return v.x * v.x + v.y * v.y;
}

export function length(v) {
  return Math.sqrt(lengthSquared(v));
}
export function normalize(v, out = {}) {
  const len = length(v);
  if (len === 0) {
    return scale(v, 0, out);
  }

  return scale(v, 1 / len, out);
}

export function distance(a, b) {
  return length(subtract(b, a));
}

export function distanceSquared(a, b) {
  lengthSquared(subtract(b, a));
}

export const vectorShape = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});
