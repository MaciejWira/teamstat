import React, { useState } from 'react';
import axios from 'axios';

import { useStateValue } from '../../../state/context';

const PlayersAdmin = () => {

  const dispatch = useStateValue()[1];

  const [ playerName, setPlayerName ] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    axios.post('/players',{
      name: playerName
    })
      .then(res => {
        console.log(res.data);
        setPlayerName('');
        dispatch({
          type: 'addPlayer',
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  };

  return(
    <div>

      <h2 className='a-subheading'>Dodaj zawodnika</h2>

      <form onSubmit={submitHandler}>
        <input
          value={playerName}
          onChange={ev => setPlayerName(ev.target.value)}/>
        <button type="submit">Dodaj</button>
      </form>

    </div>
  )
};

export default PlayersAdmin;
