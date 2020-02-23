const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayersGameSchema = new Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  isCaptain: Boolean,
  isCrate: Boolean
})

// create Player schema
const PlayerSchema = new Schema({
  name: String,
  fullName: String,
  gamesWon: [ PlayersGameSchema ],
  gamesLost: [ PlayersGameSchema ],
  gamesDrawn: [ PlayersGameSchema ]
});

// create Player model

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;
