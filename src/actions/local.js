import { SET_PLAYER_ENTITY_ID } from '../constants/actions';

export const setPlayerEntityID = id => ({
  type: SET_PLAYER_ENTITY_ID,
  payload: id,
});
