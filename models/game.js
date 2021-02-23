const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ['around-the-world', '301', 'cricket'],
    required: true,
  },
  name: { type: String, required: true },
  currentPlayerId: {
    type: mongoose.Types.ObjectId,
    ref: 'Player',
    default: null,
  },
})

module.exports = mongoose.model('Game', gameSchema)
