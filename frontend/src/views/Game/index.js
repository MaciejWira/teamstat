import React, { useState, useEffect } from 'react';

// import { fieldParserNumber } from '../../helpers/fieldParsers';
import { useGame } from './useGame';
import TeamData from '../../components/TeamData';

const Game = () => {

  const {
    gameDetails, playersList, setPlayersList,
    captainHandler, scoreHandler, submitHandler, crateHandler
  } = useGame();

  const teams = gameDetails.teams.map((teamDetail, index) => (
    <div key={index} className='b-col-2'>
      <TeamData
        playersList={playersList}
        setPlayersList={setPlayersList}
        captainHandler={captainHandler}
        score={teamDetail.score}
        scoreHandler={scoreHandler}
        teamId={teamDetail.id}
        heading={teamDetail.name} />
    </div>
  ));

  return (
    <>
      <div className='o-game'>
        <h2 className='a-heading o-game__heading'>Mecz</h2>

        <div className='o-game__date'>
          Dzisiejszy mecz
        </div>

        <div className='o-game__main'>
          <div className='b-row'>
            {teams}
          </div>

          <label className='o-game__crate'>
            <input
              onChange={e => crateHandler(e.target.checked)}
              name="crate"
              type="checkbox" />
            Krata?
          </label>

          <button onClick={submitHandler}>Zapisz mecz</button>
        </div>

      </div>
    </>
  )
};

export default Game;
