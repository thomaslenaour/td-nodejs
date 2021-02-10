const { check } = require('prettier')

class GameMode {
  constructor(players) {
    if (this.constructor === GameMode) {
      throw new TypeError('GameMode cannot be instantiated directly')
    }

    if (players.length < 2) {
      throw new TypeError('Missing players')
    }

    this.players = players
    // this.firstPlayer = this.players[
    //   Math.floor(Math.random() * this.players.length)
    // ]
  }

  // getFirstPlayer() {
  //   return this.firstPlayer
  // }

  checkWin(player) {
    return player.win
  }

  arrowShot() {
    throw new Error('You should define arrowShot method in your class')
  }
}

module.exports = GameMode
