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
      this.rankCounter++
      this.currentPlayer.rank = this.rankCounter
    }

    if(this.isFinished()) {
      console.log(`La partie est terminée, voici le résultat final :`)
      console.log(this.gamePlayers)
      process.exit(0)
    }

    this.setCurrentPlayer(this.currentPlayer.order + 1)
  }

  checkWin(currentPlayer) {
    return currentPlayer.score === 20 ? true : false
  }
}

module.exports = AroundTheWorld
