const express = require('express');

const router = express.Router();
const Game = require('../models/game');
const Player = require('../models/player');

router.get('/', (req, res, next) => {
  Game.find({})
    .then(games => console.log(games))
    .catch(next)
});

router.post('/', (req, res, next) => {
  const { date, isCrate, isDraw, teams } = req.body;
  const game = new Game({ date, isCrate, isDraw, teams });
  game.save(function(err){
    if (err) return err;
    game.teams.forEach(team => {
      team.players.forEach(player => {
        const gamesType = game.isDraw ? 'gamesDrawn' : (team.isWinner ? 'gamesWon' : 'gamesLost');
        Player.findOne({ _id: player }, function(error, result){
          const isCaptain = JSON.stringify(team.captainId) === JSON.stringify(player);
          const referencedGame = {
            gameId: game._id,
            isCaptain,
            isCrate
          };
          const updatedGamesType = [...result[gamesType]];
          updatedGamesType.push(referencedGame);
          Player.updateOne({ _id: player }, { $set: { [gamesType]: updatedGamesType } }, function(error, result){
            if (error) return error;
            console.log(result);
          });
        });
      })
    });

    res.json(game);
  });



});

module.exports = router;
