export const playersReducer = (players, action) => {
  switch (action.type) {

    case 'setPlayers':
      return action.payload;

    case 'addPlayer':
      return [...players, action.payload];

    default:
      return players;
  }
}
