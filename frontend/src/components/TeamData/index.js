import React, { useState } from 'react';

import Modal from '../Modal';
import PlayersSelector from '../PlayersSelector';

const TeamData = ({
  playersList, setPlayersList, captainHandler, score, scoreHandler, teamId, heading
}) => {

  const [ modalOpened, setModalOpened ] = useState(false);

  const playerHandler = (teamId, playerIndex) => {
    const updatedPlayersList = [...playersList];
    updatedPlayersList[playerIndex] = {
      ...playersList[playerIndex],
      teamId: !playersList[playerIndex].teamId ? teamId : 0};
    setPlayersList(updatedPlayersList);
  };

  const filteredPlayers = playersList.filter(player => player.teamId === teamId);

  const playersPicked = filteredPlayers.map(player => (
                          <li key={player.id}>{player.name}</li>
                        ));

  const captainOptions = filteredPlayers.map(player => (
    <option key={player.id} value={player.id}>{player.name}</option>
  ))

  return(
    <div className='c-team-data'>
      <h3 className='a-subheading c-team-data__heading'>{heading}</h3>

      <div>
        <input
          className='c-team-date__score'
          value={score}
          onChange={e => scoreHandler(e, teamId)}/>
      </div>

      <select
        onChange={e => captainHandler(e.target.value, teamId)}
        className="c-team-data__select"
        style={{ display: playersPicked.length ? '' : 'none'}}>
        <option value="0">Wybierz kapitana</option>
        {captainOptions}
      </select>

      <div>
        <button
          className='a-button'
          onClick={() => setModalOpened(true)}>
          Wybierz zawodników
        </button>
        <ul>
          {playersPicked}
        </ul>
      </div>

      <Modal isOpened={modalOpened} handler={setModalOpened}>
        <PlayersSelector
          teamId={teamId}
          playerHandler={playerHandler}
          playersList={playersList} />
      </Modal>
    </div>
  )
};

export default TeamData;
