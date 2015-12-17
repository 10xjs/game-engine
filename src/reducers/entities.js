import { MOVE_ENTITY, CREATE_ENTITY } from '../actions/types';

export default (state = {}, action) => {
  const handlers = {
    [MOVE_ENTITY]: moveEntity,
    [CREATE_ENTITY]: createEntity,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

function moveEntity(state, { payload: { id, x, y } }) {
  const entity = {
    ...state[id],
    x,
    y,
  };

  return {
    ...state,
    id: entity,
  };
}

function createEntity(state, { payload }) {
  const { id, x, y } = payload;

  return {
    ...state,
    [id]: { id, x, y },
  };
}
