import Map from './map';
import { scale, add } from './math-2d';
import { createEntity } from './actions/entitiy';
import { setPlayerEntityID } from './actions/local';
import { generate, indexToCoordinate } from './cave';

const tileSize = 16;

const width = 20;
const height = 20;

export default class CaveMap extends Map {
  mapWillLoad() {
    const { dispatch } = this.props;
    this.map = generate(width, height);

    let player;

    this.map.forEach((tile, i) => {
      const point = indexToCoordinate(i, width);
      if (!tile) {
        dispatch(createEntity({
          id: `block${i}`,
          position: add(scale(point, tileSize), { x: tileSize / 2, y: tileSize / 2 }),
          active: true,
          dynamic: true,
        }));
      } else if (!player) {
        dispatch(setPlayerEntityID('player'));
        player = dispatch(createEntity({
          id: 'player',
          position: add(scale(point, tileSize), { x: tileSize / 2, y: tileSize / 2 }),
          active: true,
          dynamic: true,
          iMass: 2,
        }));
      }
    });
  }

  update() {

  }
}
