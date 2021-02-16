class GameMode {
  constructor(name) {
    if (this.constructor === GameMode) {
      throw new TypeError('GameMode ne peut pas être instancier directement')
    }

    this.name = name
    this.status = 'draft'
    this.createdAt = Date.now()
    this.gamePlayers = []
    this.currentPlayer = undefined
    this.rankCounter = 0
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

    this.currentPlayer = this.gamePlayers.find(
      (player) => player.order === orderNumber
    )
  }
}

module.exports = GameMode
