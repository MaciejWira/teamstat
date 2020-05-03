import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Player = (props) => {

  const { match } = props;
  const [ player, setPlayer ] = useState({});

  useEffect(() => {
    axios.get(`/players/${match.params.id}`)
      .then(res => setPlayer(res.data))
      .catch(err => console.log(err))
  }, []);

  const gamesPropCounter = (type, propOne, propTwo) => {
    return !player[type] ? null : player[type].reduce((total, game) => {
      if (propTwo){
        if (game[propOne] && game[propTwo]) return total + 1;
        else return total;
      } else {
        if (game[propOne]) return total + 1;
        else return total;
      }
    }, 0);
  };

  const statsConstructor = [
    { name: 'Mecze wygrane', value: player.gamesWon ? player.gamesWon.length : null },
    { name: 'Mecze wygrane jako kapitan', value: gamesPropCounter('gamesWon', 'isCaptain') },
    { name: 'Wygrane kraty', value: gamesPropCounter('gamesWon', 'isCrate') },
    { name: 'Wygrane kraty jako kapitan', value: gamesPropCounter('gamesWon', 'isCaptain', 'isCrate') },
    { name: 'Mecze przegrane', value: player.gamesLost ? player.gamesLost.length : null },
    { name: 'Mecze przegrane jako kapitan', value: gamesPropCounter('gamesLost', 'isCaptain') },
    { name: 'Przegrane kraty', value: gamesPropCounter('gamesLost', 'isCrate') },
    { name: 'Przegrane kraty jako kapitan', value: gamesPropCounter('gamesLost', 'isCaptain', 'isCrate') },
    { name: 'Mecze zremisowane', value: player.gamesDrawn ? player.gamesDrawn.length : null },
    { name: 'Mecze zremisowane jako kapitan', value: gamesPropCounter('gamesDrawn', 'isCaptain') }
  ]

  const stats = statsConstructor.map((stat, index) => (
    <div className="b-col-1" key={index}>
      <div className="o-player__stat">
        <p>
          <span className="a-label">{stat.name}:</span>
          <span className="o-player__stat-value">{stat.value}</span>
        </p>
      </div>
    </div>
  ));

  return(
    <div className="o-player">
      <h1 className="a-heading">{player.name}</h1>
      <div className="o-player__stats">
        <div className="b-row">
          {stats}
        </div>
      </div>
    </div>
  )
};

export default Player;
