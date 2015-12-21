import { copy } from '../math-2d';
import { getActiveEntities } from './entities';

export function getDynamicsStateClone(state) {
  const entities = getActiveEntities(state);
  return {
    entities: entities.map(entity => {
      const { id, position, size, velocity, iMass, dynamic, active } = entity;
      return {
        id,
        position: copy(position),
        size: copy(size),
        velocity,
        iMass,
        dynamic,
        active,
        impulses: [],
      };
    }),
  };
}
