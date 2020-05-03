import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { dateStandard } from '../../helpers/dateParsers';
import List from '../../components/List';

const Games = () => {

  const [ games, setGames ] = useState([]);

  const loadGames = () => {
    axios.get('/games')
      .then(res => {
        console.log(res.data);
        setGames(res.data);
      })
      .catch(err => console.log(err))
  };

  useEffect(loadGames, []);

  const deleteGame = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    axios.delete(`/games/${id}`)
      .then(res => {
        loadGames();
        alert('Usunięto mecz');
      })
      .catch(err => {
        alert('Wystąpił błąd');
        console.log('delete fail');
      })
  };

  return(
    <div className="o-games">
      <h1 className='a-heading o-games__heading'>Mecze</h1>
      <List
        elementsArray={games}
        path='games'
        listedProp='date'
        listedPropModifier={dateStandard}
        buttonText='Usuń'
        buttonHandler={deleteGame}
        />
    </div>
  )
}

export default Games;
