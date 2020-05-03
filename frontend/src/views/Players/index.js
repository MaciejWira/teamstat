import React from 'react';
import PlayersList from './PlayersList';
import PlayersAdmin from './PlayersAdmin';

const Players = () => {

  return(
    <div className="o-players">
      <PlayersAdmin/>
      <h1 className='a-heading'>Zawodnicy</h1>
      <PlayersList/>
    </div>
  )
};

export default Players;
