import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { PATH_PLAYER } from '../../../views/helpers';
import { useSearch } from '../../../hooks/useSearch';
import { useStateValue } from '../../../state/context';

const PlayersList = () => {

  const [ { players }, dispatch ] = useStateValue();
  const { searchValue, setSearchValue, filteredValues, searchInput } = useSearch({ arr: players, prop: 'name' });

  const playersTabs = filteredValues.map(player => (
    <div className="b-col-1" key={player._id}>
      <Link
        to={`${PATH_PLAYER}/${player._id}`}
        className='o-list__tab'>
        {player.name}
        <span className="a-caret"></span>
      </Link>
    </div>
  ));

  return(
    <div className='o-list'>
      <div className='o-list__filters'>
        {searchInput}
      </div>
      <div className='o-list__tabs b-row'>
        {playersTabs}
      </div>
    </div>
  )
};

export default PlayersList;
