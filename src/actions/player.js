import { SET_PLAYER_ID } from './types';

export const setPlayerID = id => ({
  type: SET_PLAYER_ID,
  payload: id,
});
