import React, { useState } from 'react';

import Modal from '../Modal';
import PlayersSelector from '../PlayersSelector';

const TeamData = ({
  team,
  playersList, setPlayersList, captainHandler, score, scoreHandler, teamId, heading
}) => {

  // component for adding or listing game

  // just for adding new game

  const filteredPlayers = team ? null : playersList.filter(player => player.teamId === teamId);

  const [ modalOpened, setModalOpened ] = useState(false);

  const playerHandler = (teamId, playerIndex) => {
    const updatedPlayersList = [...playersList];
    updatedPlayersList[playerIndex] = {
      ...playersList[playerIndex],
      teamId: !playersList[playerIndex].teamId ? teamId : 0};
    setPlayersList(updatedPlayersList);
  };

  const captainOptions = team ? null : filteredPlayers.map(player => (
    <option key={player._id} value={player._id}>{player.name}</option>
  ));

  //

  // score

  const scoreMarkup = team ? (
    <p className="c-team-data__score">{team.score}</p>
  ) : (
    <input
      className='c-team-data__score'
      value={score}
      onChange={e => scoreHandler(e, teamId)}/>
  );

  // players list

  const _players = team ? team.players : filteredPlayers; // adding or listing

  const playersPicked = _players.map(player => {
    const captainId = team ? team.captainId : null;
    const captainBadge = captainId && captainId === player._id ? (<span className="a-label"> (k)</span>) : "";
    return(
      <li
        className="c-team-data__li"
        key={player._id}>
        {player.name}{captainBadge}
      </li>
    )
  });

  // captain

  const captainMarkup = team ? null : (
    <select
      onChange={e => captainHandler(e.target.value, teamId)}
      className="c-team-data__select"
      style={{ display: playersPicked.length ? '' : 'none'}}>
      <option value="0">Wybierz kapitana</option>
      {captainOptions}
    </select>
  );

  // button - players selection

  const buttonMarkup = team ? null : (
    <button
      className='a-button'
      onClick={() => setModalOpened(true)}>
      Wybierz zawodników
    </button>
  );

  // modal with players to pick

  const modalMarkup = team ? null : (
    <Modal isOpened={modalOpened} handler={setModalOpened}>
      <PlayersSelector
        teamId={teamId}
        playerHandler={playerHandler}
        playersList={playersList} />
    </Modal>
  );

  return(
    <div className={`c-team-data${ team ? " c-team-data--presentation" : "" }`}>
      <label className='a-label c-team-data__label'>{heading}</label>

      {scoreMarkup}
      {captainMarkup}

      <div>
        {buttonMarkup}
        { team ? (<p className="a-label">Skład:</p>) : null}
        <ol className="c-team-data__ol">
          {playersPicked}
        </ol>
      </div>

      {modalMarkup}

    </div>
  )
};

export default TeamData;
