const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ['around-the-world', '301', 'cricket'],
    required: true,
  },
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ['draft', 'started', 'ended'],
    required: true,
    default: 'draft',
  },
  currentPlayerId: {
    type: mongoose.Types.ObjectId,
    ref: 'GamePlayer',
    default: null,
  },
})

module.exports = mongoose.model('Game', gameSchema)
