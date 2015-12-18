import { PropTypes } from 'react';

export function v(x = 0, y = 0) {
  return { x, y };
}

export function add(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function lengthSquared(v) {
  return v.x * v.x + v.y * v.y;
}

export function scale(v, s) {
  return {
    x: v.x * s,
    y: v.y * s,
  };
}

export function addScaled(a, b, s) {
  return add(a, scale(b, s));
}

export function subtractScaled(a, b, s) {
  return addScaled(a, b, -s);
}

export function length(v) {
  return Math.sqrt(lengthSquared(v));
}

export function subtract(a, b) {
  return addScaled(a, b, -1);
}

export function normalize(v) {
  const len = length(v);
  if (len === 0) {
    return scale(v, 0);
  }

  return scale(v, 1 / len);
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
