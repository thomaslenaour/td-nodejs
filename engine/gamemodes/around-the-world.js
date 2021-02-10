const GameMode = require('../gamemode')

class AroundTheWorld extends GameMode {
  constructor(players) {
    super(players)
  }

  checkWin() {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].scores === 20) {
        return this.players[i]
      }
    }

    return false
  }
}

module.exports = AroundTheWorld
