import React from 'react';

import { useSearch } from '../../hooks/useSearch';

const PlayersSelector = ({
  teamId, playersList = [], playerHandler
}) => {

  const selectHandler = playerIndex => {
    playerHandler(teamId, playerIndex);
  };

  const { searchValue, setSearchValue, filteredValues, searchInput } = useSearch({
    arr: playersList, prop: 'name'
  });

  const playersSelections = filteredValues.map((player, index) => (
    <li
      key={player._id}
      className="c-players-selector__item">
      <button
        disabled={ player.teamId && player.teamId !== teamId }
        onClick={() => selectHandler(index)}
        className={`a-button a-button--light c-players-selector__button${player.teamId ? " c-players-selector__button--chosen" : ""}`}>
        {player.name}
      </button>
    </li>
  ))

  return(
    <div className="c-players-selector">
      {searchInput}
      <ul className="c-players-selector__list">
        {playersSelections}
      </ul>
    </div>
  )
};

export default PlayersSelector;
