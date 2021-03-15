class GameMode {
  constructor(name) {
    if (this.constructor === GameMode) {
      throw new TypeError('GameMode ne peut pas être instancier directement')
    }

    this.id = 1
    this.name = name
    this.status = 'draft'
    this.createdAt = Date.now()
    this.gamePlayers = []
    this.currentPlayer = undefined
    this.rankCounter = 0
  }

  startGame() {
    this.status = 'started'
  }

  addPlayer(newPlayer) {
    if (this.status !== 'draft') {
      throw new Error(
        "La partie est déjà démarrée. Impossile d'ajouter un nouveau joueur"
      )
    }

    this.gamePlayers.push(newPlayer)
  }

  deletePlayer(playerID) {
    if (this.status !== 'draft') {
      throw new Error(
        'La partie est déjà démarré. Impossile de supprimer un joueur'
      )
    }

    this.gamePlayers = this.gamePlayers.filter(
      (player) => player.id !== playerID
    )
  }

  shot() {
    throw new Error('Cette méthode doit être implémentée dans la classe enfant')
  }

  checkWin() {
    throw new Error('Cette méthode doit être implémentée dans la classe enfant')
  }

  setPlayersOrder() {
    const orders = [...Array(this.gamePlayers.length).keys()].sort(
      () => Math.random() - 0.5
    )

    this.gamePlayers = this.gamePlayers.map((player) => {
      player.order = orders.pop()
      return player
    })

    this.setCurrentPlayer(0)
  }

  setCurrentPlayer(orderNumber) {
    if (orderNumber === this.gamePlayers.length) orderNumber = 0

    const currentPlayer = this.gamePlayers.find(
      (player) => player.order === orderNumber
    )

    if (currentPlayer.rank !== null) {
      this.setCurrentPlayer(orderNumber + 1)
    }

    this.currentPlayer = currentPlayer
  }

  isFinished() {
    const isFinished =
      this.gamePlayers.filter((player) => player.rank === null).length === 1

    if (isFinished) {
      const lastPlayer = this.gamePlayers.find((player) => player.rank === null)
      lastPlayer.rank = this.gamePlayers.length
      lastPlayer.inGame = false
    }

    return isFinished
  }

  isStarted() {
    if (this.status !== 'started')
      throw new Error('Vous devez lancer la partie avant de pouvoir jouer')
  }
}

module.exports = GameMode
