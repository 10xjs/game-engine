import { add, subtract } from './math-2d';

export function generate(width, height, threshold = 0.45) {
  let map = [];

  function stage1(tile, i) {
    return countRange(map, width, height, i, 1) >= 5
      || countRange(map, width, height, i, 2) <= 2;
  }

  function stage2(tile, i) {
    return countRange(map, width, height, i, 1) >= 5;
  }

  for ( let i = 0; i < width * height; i ++) {
    map[i] = Math.random() >= threshold;
  }

  for (let i = 0; i < 4; i ++) {
    map = map.map(stage1);
  }

  for (let i = 0; i < 3; i ++) {
    map = map.map(stage2);
  }

  return map;
}

function coordinateToIndex(point, width) {
  return point.y * width + point.x;
}

function pointInBounds(point, width, height) {
  return (point.x >= 0 && point.y >= 0 && point.x < width && point.y < height);
}

export function indexToCoordinate(i, width) {
  return {
    x: i % width,
    y: Math.floor(i / width),
  };
}

function countRange(map, width, height, index, offset) {
  const point = indexToCoordinate(index, width);
  const size = offset * 2 + 1;
  const topLeft = subtract(point, { x: offset, y: offset});

  let count = 0;

  for (let i = 0; i < size; i ++) {
    for (let j = 0; j < size; j++) {
      const check = add(topLeft, { x: j, y: i });
      const indexCheck = coordinateToIndex(check, width);
      if (pointInBounds(check, width, height)) {
        if (map[indexCheck]) {
          count ++;
        }
      }
    }
  }

  return count;
}
