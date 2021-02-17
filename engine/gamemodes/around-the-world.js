const GameMode = require('../gamemode')

class AroundTheWorld extends GameMode {
  constructor(name) {
    super(name)
  }

  startGame() {
    this.status = 'started'
  }

  shot(sector) {
    if (this.status !== 'started') {
      throw new Error('Vous devez lancer la partie avant de pouvoir jouer')
    }

    if (sector === this.currentPlayer.score + 1) {
      this.currentPlayer.score++
    }

    if (this.checkWin(this.currentPlayer)) {
      this.currentPlayer.rank = this.rankCounter + 1
      this.rankCounter++
    }

    this.setCurrentPlayer(this.currentPlayer.order + 1)
  }

  checkWin(currentPlayer) {
    if (currentPlayer.score === 20) {
      return true
    }

    return false
  }
}

module.exports = AroundTheWorld
