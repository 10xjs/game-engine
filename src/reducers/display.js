import { combineReducers } from 'redux';

const width = (state = 640) => {
  return state;
};

const height = (state = 480) => {
  return state;
};

export default combineReducers({
  width,
  height,
});
