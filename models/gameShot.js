const mongoose = require('mongoose')

const gameShotSchema = new mongoose.Schema({
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
  multiplicator: { type: Number, enum: [1, 2, 3], required: true },
  sector: {
    type: Number,
    enum: [...Array(20).keys()].concat([25, 50]),
    required: true,
  },
})

module.exports = mongoose.model('GameShot', gameShotSchema)
