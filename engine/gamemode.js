class GameMode {
  constructor(players) {
    if (this.constructor === GameMode) {
      throw new TypeError('GameMode cannot be instantiated directly')
    }

    if (players.length < 2) {
      throw new TypeError('Missing players')
    }

    this.players = players
    this.targets = Array.from({ length: 21 }, (_, i) => i + 1)
    this.firstPlayer = this.players[
      Math.floor(Math.random() * this.players.length)
    ]
  }

  getFirstPlayer() {
    return this.firstPlayer
  }
}

module.exports = GameMode
