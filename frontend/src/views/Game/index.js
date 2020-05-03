import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router';

import { PATH_GAMES } from '../helpers';
import { dateInput, dateStandard } from '../../helpers/dateParsers';
import { useGame } from './useGame';
import DatePicker from '../../components/DatePicker';
import TeamData from '../../components/TeamData';

const Game = props => {

  const paramId = props.match.params.id; // for existing games

  const {
    game, isLoaded,
    gameDetails, playersList, setPlayersList,
    dateHandler, captainHandler, scoreHandler, submitHandler, crateHandler, deleteGameHandler,
    redirect
  } = useGame(paramId);

  console.log(gameDetails);

  const dateMarkup = paramId ? null : (
    <DatePicker
      onChangeHandler={dateHandler}
      value={dateInput(gameDetails.date)}/>
  );

  const teams = gameDetails.teams.map((teamDetail, index) => (
    <div key={index} className='b-col-2'>
      <TeamData
        team={game.teams ? game.teams[index] : null}
        playersList={playersList}
        setPlayersList={setPlayersList}
        captainHandler={captainHandler}
        score={teamDetail.score}
        scoreHandler={scoreHandler}
        teamId={teamDetail.id}
        heading={teamDetail.name} />
    </div>
  ));

  const crate = (paramId || gameDetails.teams[0].score == gameDetails.teams[1].score) ? null : (
    <label className='o-game__crate'>
      <input
        checked={gameDetails.isCrate}
        onChange={e => crateHandler(e.target.checked)}
        name="crate"
        type="checkbox" />
      <span>Krata?</span>
    </label>
  );

  const submitButton = paramId ? null : (
    <button
      className="a-button a-button--grey a-button--large"
      onClick={submitHandler}>Zapisz mecz</button>
  );

  const deleteButton = !paramId ? null : (
    <button
      className="a-button a-button--grey a-button--full"
      onClick={deleteGameHandler}>Usuń mecz
    </button>
  );

  const redirectComponent = !redirect ? null : (<Redirect to={PATH_GAMES}/>);

  return (
    <>
      {redirectComponent}
      <div className='o-game'>
        <h2 className='a-heading o-game__heading'>{paramId ? ( game.date ? dateStandard(game.date) : "" ) : "Dodaj mecz"}</h2>

        <div className={`o-game__wrapper${ isLoaded ? " o-game__wrapper--show" : "" }`}>

          <div className='o-game__date'>
            {dateMarkup}
          </div>

          <div className='o-game__main'>
            <div className='b-row'>
              {teams}
            </div>
            {crate}
            {submitButton}
          </div>

          {deleteButton}

        </div>


      </div>
    </>
  )
};

export default Game;
