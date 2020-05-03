import { useState, useEffect } from 'react';
import axios from 'axios';

import { dateResetHour } from '../../helpers/dateParsers';
import { initialGameDetails } from './helpers';
import { useStateValue } from '../../state/context';


export const useGame = paramId => {

    const [ game, setGame ] = useState({});
    const [ redirect, setRedirect ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ { players } ] = useStateValue();
    const [ playersList, setPlayersList ] = useState([]);
    const [ gameDetails, setGameDetails ] = useState(initialGameDetails);

    useEffect(() => {
      if (paramId){
        axios.get(`/games/${paramId}`)
          .then(res => {
            setGame(res.data);
          })
          .catch(err => console.log(err))
          .finally(() => setIsLoaded(true))
      } else {
        setIsLoaded(true);
      }
    }, []);

    useEffect(() => {
      const newPlayersList = [];
      players.forEach(player => {
        newPlayersList.push({
          _id: player._id,
          name: player.name,
          teamId: 0
        })
      });
      setPlayersList(newPlayersList);
    }, [ players ]);

    const dateHandler = date => {
      const _date = date ? new Date(date) : new Date();
      setGameDetails(prev => ({...prev, date: dateResetHour(_date)}));
    };

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
        updatedTeam.players = updatedTeam.players.map(player => player._id);
        return updatedTeam;
      });

      // no crate option when draw
      if (updatedTeams[0].score == updatedTeams[1].score) dataToSend.isCrate = false;

      dataToSend.teams = updatedTeams;

      // validation
      let breakFlag = false;

      // validation players amount
      dataToSend.teams.forEach(team => {
        if ( !breakFlag ){
          if ( !team.players.length ){
            breakFlag = true;
            alert('Wypada, by każda drużyna miała co najmniej jednego zawodnika ;)');
          }
        }
      });

      // validation captains
      dataToSend.teams.forEach(team => {
        if ( !breakFlag ){
          if ( !team.captainId ){
            breakFlag = true;
            alert('Wybierz kapitana dla każdej z drużyn');
          }
        };
      });

      // send game details
      if (!breakFlag){
        axios.post('/games', dataToSend)
        .then(res => {
          console.log(res.data);
          alert("Mecz zapisano");
          setGameDetails(initialGameDetails);
          setPlayersList([]);
        })
        .catch(err => alert("Wystąpił błąd.\n" + err.response.data.error))
      }

    }

    const scoreHandler = (e, teamId) => {
      // change value only if it is a number
      if ( /^[0-9]*$/.test(e.target.value) && e.target.value.length <= 5){

        // remove zero in front
        const _e = e.target.value ? e.target.value : "0";
        const value = ( _e.length > 1 && /^0/.test(_e) ) ? _e.slice(1) : _e;

        const updatedTeams = gameDetails.teams.map(team => {
          if (teamId === team.id) return {...team, score: value};
          else return team;
        });
        setGameDetails({
          ...gameDetails,
          teams: updatedTeams
        });
      }
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

    const deleteGameHandler = () => {
      axios.delete(`/games/${paramId}`)
        .then(res => setRedirect(true))
        .catch(err => {
          console.log('delete fail');
          console.log(err)
        })
    }

    return {
      game,
      isLoaded,
      gameDetails,
      playersList, setPlayersList,
      dateHandler,
      captainHandler,
      scoreHandler,
      submitHandler,
      crateHandler,
      deleteGameHandler,
      redirect
    }

}
