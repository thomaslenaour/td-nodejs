const GameMode = require('../gamemode')

class ThreeHundredAndOne extends GameMode {
  constructor(name) {
    super(name)
    this.sector = Array.from({ length: 20 }, (_, i) => i + 1).concat([25, 50])
  }

  shot(sector, multiplier) {
    this.isStarted()
    this.isValidShot(sector, multiplier)

    const nextScore = this.currentPlayer.score - sector * multiplier

    if ((nextScore === 0 && multiplier === 2) || nextScore > 0)
      this.currentPlayer.score = nextScore

    if (this.checkWin(this.currentPlayer)) {
      this.rankCounter++
      this.currentPlayer.rank = this.rankCounter
    }

    if (this.isFinished()) {
      console.log(`La partie est terminée, voici le résultat final :`)
      console.log(this.gamePlayers)
      process.exit(0)
    }

    this.setCurrentPlayer(this.currentPlayer.order + 1)
  }

  checkWin(currentPlayer) {
    return currentPlayer.score === 0
  }

  isValidShot(sector, multiplier) {
    if (!this.sector.includes(sector))
      throw new Error(
        `Le secteur que vous avez saisi (${sector}) n'est pas valide`
      )

    if ((sector === 25 || sector === 50) && multiplier !== 1)
      throw new Error(
        `Le multiplicateur que vous avez saisi (${multiplier}) n'est pas valide`
      )

    if (![1, 2, 3].includes(multiplier))
      throw new Error(
        `Le multiplicateur que vous avez saisi (${multiplier}) n'est pas valide`
      )
  }
}

module.exports = ThreeHundredAndOne
