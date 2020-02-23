const express = require('express');
const router = express.Router();
const Player = require('../models/player');

// get all

router.get('/', (req, res, next) => {
  Player.find({})
    .then(players => res.send(players))
    .catch(next)
});

// get single


router.get('/:id', (req, res, next) => {
  // console.log(req.params);
  // res.send(req.params.id);
  Player.find({ _id: req.params.id })
    .then(player => res.send(player[0]))
    .catch(next)
});

router.post('/', (req, res, next) => {
  console.log(req.body);
  Player.create(req.body)
    .then(player => res.send(player))
    .catch(next)
})

module.exports = router;
