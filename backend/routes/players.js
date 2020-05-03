const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// get all

router.get('/', (req, res, next) => {
  Player.find({})
    .then(players => res.send(players))
    .catch(() => {
      res.json([]);
      next();
    })
});

// get single

router.get('/:id', (req, res, next) => {
  Player.find({ _id: req.params.id })
    .then(player => res.send(player[0]))
    .catch(next)
});

// create

router.post('/', (req, res, next) => {
  // demo version - limited number of players id db
  Player.find({})
    .then(players => {
      if (players.length <= 999){
        Player.create(req.body)
          .then(player => res.send(player))
          .catch(next)
      } else {
        throw new Error("Wersja demo. Nie możesz dodać więcej zawodników.");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(401).send({ error: err.message });
      next();
    });

})

module.exports = router;
