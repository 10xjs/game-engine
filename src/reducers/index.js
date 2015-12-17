import { combineReducers } from 'redux';

import entities from './entities';
import local from './local';
import display from './display';
import input from './input';
import stats from './stats';

export default combineReducers({
  entities,
  local,
  display,
  input,
  stats,
});
