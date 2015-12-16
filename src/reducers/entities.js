import { MOVE } from '../actions/types';

export default (state = {}, action) => {
  const handlers = {
    [MOVE]: moveEntity,
    default: state => state,
  };
  return (handlers[action.type] || handlers.default)(state, action);
};

function moveEntity(state, { payload: { id, dx, dy } }) {
  const entity = {
    ...state[id],
    x: state[id] + dx,
    y: state[id] + dy,
  };

  return {
    ...state,
    id: entity,
  };
}
