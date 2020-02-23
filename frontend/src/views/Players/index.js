import React from 'react';
import PlayersList from './PlayersList';
import PlayersAdmin from './PlayersAdmin';

const Players = () => {

  return(
    <div>
      <PlayersAdmin/>
      <PlayersList/>
    </div>
  )
};

export default Players;
