const mongoose = require('mongoose')

const gamePlayerSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  gameId: {
    type: mongoose.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  remainingShots: { type: Number, default: 3 },
  score: { type: Number, required: true },
  rank: { type: Number, default: null },
  order: { type: Number, default: null },
  inGame: { type: Boolean, default: true, required: true },
  createdAt: { type: Number, required: true },
})

module.exports = mongoose.model('GamePlayer', gamePlayerSchema)
