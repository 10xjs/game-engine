import { combineReducers } from 'redux';

import entities from './entities';
import player from './player';
import display from './display';
import input from './input';
import stats from './stats';

export default combineReducers({
  entities,
  player,
  display,
  input,
  stats,
});
