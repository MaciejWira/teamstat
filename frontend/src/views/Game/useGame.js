import { useState, useEffect } from 'react';
import axios from 'axios';

import { useStateValue } from '../../state/context';
import { initialGameDetails } from './helpers';

export const useGame = () => {

    const [ { players } ] = useStateValue();
    const [ playersList, setPlayersList ] = useState([]);
    const [ gameDetails, setGameDetails ] = useState(initialGameDetails);

    useEffect(() => {
      const newPlayersList = [];
      players.forEach(player => {
        newPlayersList.push({
          id: player._id,
          name: player.name,
          teamId: 0
        })
      });
      setPlayersList(newPlayersList);
    }, [ players ]);

    const submitHandler = () => {
      const dataToSend = {...gameDetails};
      // set winnerId or draw
      const teamOneScore = parseInt(gameDetails.teams[0].score),
            teamTwoScore = parseInt(gameDetails.teams[1].score);
      if (teamOneScore > teamTwoScore) dataToSend.teams[0].isWinner = true;
      else if (teamOneScore < teamTwoScore) dataToSend.teams[1].isWinner = true;
      else dataToSend.isDraw = true;

      // set players and parse score
      const updatedTeams = dataToSend.teams.map((team, index) => {
        const updatedTeam = {...team};
        updatedTeam.score = parseInt(updatedTeam.score);
        updatedTeam.players = playersList.filter(player => player.teamId === team.id);
        updatedTeam.players = updatedTeam.players.map(player => player.id);
        return updatedTeam;
      });

      dataToSend.teams = updatedTeams;

      // send game details
      axios.post('/games', dataToSend)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const scoreHandler = (e, teamId) => {
      const updatedTeams = gameDetails.teams.map(team => {
        if (teamId === team.id) return {...team, score: e.target.value};
        else return team;
      });
      setGameDetails({
        ...gameDetails,
        teams: updatedTeams
      });
    };

    const captainHandler = (id, teamId) => {
      const updatedTeams = gameDetails.teams.map(team => {
        if (team.id === teamId){
          return { ...team, captainId: id }
        } else return team;
      })
      setGameDetails(prev => ({ ...prev, teams: updatedTeams }))
    };

    const crateHandler = isChecked => {
      setGameDetails(prev => ({ ...prev, isCrate: isChecked }))
    }

    return {
      gameDetails,
      playersList, setPlayersList,
      captainHandler,
      scoreHandler,
      submitHandler,
      crateHandler
    }

}
