const GameMode = require('../gamemode')

class AroundTheWorld extends GameMode {
  shot(sector, multiplicator) {
    this.isStarted()

    if (sector === this.currentPlayer.score + 1) {
      this.currentPlayer.score++
    }

    if (this.checkWin(this.currentPlayer)) {
      this.rankCounter++
      this.currentPlayer.rank = this.rankCounter
      this.currentPlayer.inGame = false
    }

    if (this.isFinished()) {
      this.status = 'ended'
    } else {
      this.currentPlayer.remainingShots--
      if (
        this.currentPlayer.remainingShots === 0 ||
        this.currentPlayer.rank !== null
      ) {
        if (this.currentPlayer.remainingShots === 0) {
          this.currentPlayer.remainingShots = 3
        }

        this.setCurrentPlayer(this.currentPlayer.order + 1)
      }
    }
  }

  checkWin(currentPlayer) {
    return currentPlayer.score === 20
  }
}

module.exports = AroundTheWorld
