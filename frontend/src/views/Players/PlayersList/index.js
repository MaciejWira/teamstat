import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { useSearch } from '../../../hooks/useSearch';
import { useStateValue } from '../../../state/context';

const PlayersList = () => {

  const [ { players }, dispatch ] = useStateValue();
  const { searchValue, setSearchValue, filteredValues, searchInput } = useSearch({ arr: players, prop: 'name' });

  const playersTabs = filteredValues.map(player => (
    <div className="b-col-1" key={player._id}>
      <Link
        to={`/player/${player._id}`}
        className='o-players-list__tab'>
        {player.name}
      </Link>
    </div>
  ));

  return(
    <div className='o-players-list'>
      <h1 className='a-heading'>Zawodnicy</h1>
      <div className='o-players-list__filters'>
        {searchInput}
      </div>
      <div className='o-players-list__tabs b-row'>
        {playersTabs}
      </div>
    </div>
  )
};

export default PlayersList;
