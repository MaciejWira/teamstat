import { playersReducer } from './playersReducer';

export const initialState = {
  players: []
}

export const mainReducer = (state, action) => ({
  players: playersReducer(state.players, action)
});
