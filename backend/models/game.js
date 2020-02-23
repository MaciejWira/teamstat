const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Game schema
const GameSchema = new Schema({
  date: Date,
  isCrate: Boolean,
  isDraw: Boolean,
  teams: [{
    name: String,
    score: Number,
    isWinner: Boolean,
    captainId: String,
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
  }]
});

// create Game model
const Game = mongoose.model('game', GameSchema);

module.exports = Game;
