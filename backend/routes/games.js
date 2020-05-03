const express = require('express');
const Game = require('../models/game');
const Player = require('../models/player');
const router = express.Router();

// get all games

router.get('/', (req, res, next) => {
  Game.find({})
    .exec(function(err, games){
      if (err){
        console.log(err);
        res.json([])
      };
      res.json(games)
    });
});

// get single game

router.get('/:id', (req, res, next) => {
  Game
    .find({ _id: req.params.id })
    .populate('teams.players', 'name')
    .then(game => res.send(game[0]))
    .catch(next)
});

// post game

router.post('/', (req, res, next) => {

  // limited games for demo version
  Game.find({})
    .then(games => {
      if (games.length > 100){
        throw new Error("Wersja demo. Nie możesz dodawać kolejnych meczów.\nMożesz usunąć inne mecze w zakładce 'Mecze'.")
      };
      console.log(req.body.date);
      // const gameDate = new Date(req.body.date);
      // console.log(gameDate);
      // console.log(typeof gameDate);
      // games.forEach(game => {
      //   console.log(game.date);
      //   console.log(typeof game.date);
      // })
      saveGame();
      // res.send('testing')
    })
    .catch(err => res.status(401).send({ error: err.message }));

  function saveGame(){
    const { date, isCrate, isDraw, teams } = req.body;
    const game = new Game({ date, isCrate, isDraw, teams });
    game.save(function(err, game){
      if (err) {
        res.json(err);
        return false;
      };
      // update players stats
      game.teams.forEach(team => {
        team.players.forEach(player => {
          const gamesType = game.isDraw ? 'gamesDrawn' : (team.isWinner ? 'gamesWon' : 'gamesLost');
          Player.findOne({ _id: player }, function(error, result){
            if (err){
              res.json(err);
              return false;
            }
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
            });
          });
        })
      }); // players update end

      res.json(game);
    });
  }

});

// delete game

router.delete('/:id', (req, res, next) => {
  Game
    .findOne({ _id: req.params.id })
      .then(game => {

        // manage players who played in that game
        let winners = [],
            losers = [],
            drawers = [];
        game.teams.forEach(team => {
          if (game.isDraw) drawers = [...drawers, ...team.players];
          else if (team.isWinner) winners = [...team.players];
          else if (!team.isWinner) losers = [...team.players];
        });

        const gameFilterer = (arr, gameProp) => {
          arr.forEach(player => {
            Player.findOne({ _id: player }, function(err, _player){
              _player[gameProp] = _player[gameProp].filter(_game => {
                return JSON.stringify(_game.gameId) !== JSON.stringify(game._id);
              });
              _player.save(function(err){
                if (err) console.log(err);
              })
            })
          })
        };

        gameFilterer(winners, 'gamesWon');
        gameFilterer(losers, 'gamesLost');
        gameFilterer(drawers, 'gamesDrawn');


        // delete game
        game.remove(function (err) {
          if (err){
            console.log(err);
            return true;
          }
          console.log('removed');
          res.send('Game deleted');
        });

      })
      .catch(err => console.log(err))
});

module.exports = router;
