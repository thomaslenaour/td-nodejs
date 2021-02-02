class GameMode {
  constructor(players) {
    if (this.constructor === GameMode) {
      throw new TypeError('GameMode cannot be instantiated directly')
    }

    this.players = players
  }
}

module.exports = GameMode
