import React, { useState } from 'react';
import axios from 'axios';

import { useStateValue } from '../../../state/context';

const PlayersAdmin = () => {

  const dispatch = useStateValue()[1];

  const [ playerName, setPlayerName ] = useState('');

  const submitHandler = e => {
    e.preventDefault();

    const submitCore = () => {
      axios.post('/players',{
        name: playerName
      })
      .then(res => {
        setPlayerName('');
        dispatch({
          type: 'addPlayer',
          payload: res.data
        })
      })
      .catch(err => {
        alert(err.response.data.error);
      })
    };

    if (localStorage.getItem('teamstat-auth') === 'authed') submitCore();
    else {
      const password = prompt("Aby dodawać zawodników, wpisz hasło podane przez administratora.\nHasło wystarczy wpisać raz.\nKontakt: wira.macie@gmail.com");
      if (password === "Guliwer"){
        localStorage.setItem('teamstat-auth', 'authed');
        axios.post('/players',{
          name: playerName
        })
        .then(res => {
          setPlayerName('');
          dispatch({
            type: 'addPlayer',
            payload: res.data
          })
        })
        .catch(err => {
          alert(err.response.data.error);
        })
      } else alert("Złe hasło");

    }
  };

  return(
    <div className="o-players__form">

      <label className='a-label o-players__label'>Dodaj zawodnika</label>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Wpisz nazwę zawodnika"
          value={playerName}
          onChange={ev => setPlayerName(ev.target.value)}/>
        <button
          className="a-button o-players__submit"
          type="submit">
          Dodaj
        </button>
      </form>

    </div>
  )
};

export default PlayersAdmin;
