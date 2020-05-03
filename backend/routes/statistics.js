const express = require('express');
const router = express.Router();
const Player = require('../models/player');

router.get('/', function(req, res, next){
  Player.find({}, null, {lean: true})
    .then(players => {

      // wins total

      const winsSorted = [...players].sort(function(a,b){
        return b.gamesWon.length - a.gamesWon.length
      });

      // wins as captain

      const winsAsCaptain = players.map(player => {
        return {
          ...player,
          gamesWon: player.gamesWon.filter(game => game.isCaptain)
        }
      });

      const winsAsCaptainSorted = winsAsCaptain.sort(function(a,b){
        return b.gamesWon.length - a.gamesWon.length
      });

      // wins with crate

      const winsWithCrate = players.map(player => {
        return {
          ...player,
          gamesWon: player.gamesWon.filter(game => game.isCrate)
        }
      });

      const winsWithCrateSorted = winsWithCrate.sort(function(a,b){
        return b.gamesWon.length - a.gamesWon.length
      });

      // wins as captain with crate

      const winsAsCaptainWithCrate = players.map(player => {
        return {
          ...player,
          gamesWon: player.gamesWon.filter(game => game.isCaptain && game.isCrate)
        }
      });

      const winsAsCaptainWithCrateSorted = winsAsCaptainWithCrate.sort(function(a,b){
        return b.gamesWon.length - a.gamesWon.length
      });

      const statistics = {
        winsSorted,
        winsAsCaptainSorted,
        winsWithCrateSorted,
        winsAsCaptainWithCrateSorted
      };

      res.json(statistics);
    })
    .catch(err => {
      console.log(err);
      next();
    })

});

module.exports = router;
