const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  gameWin: { type: Number, default: 0, required: true },
  gameLost: { type: Number, default: 0, required: true },
})

module.exports = mongoose.model('Player', playerSchema)
