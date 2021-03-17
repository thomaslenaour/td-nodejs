const GameMode = require('../gamemode')
const { redisClient } = require('../../app')

class Cricket extends GameMode {
  constructor(name) {
    super(name)
    this.sector = Array.from({ length: 20 }, (_, i) => i + 1).concat([25, 50])
    this.validSector = [15, 16, 17, 18, 19, 20, 25, 50]
  }

  async shot(sector, multiplicator) {
    this.isStarted()
    this.isValidShot(sector, multiplicator)

    if (this.validSector.includes(sector)) {
      let state
      try {
        state = await this.getDataFromRedis(this.id)
      } catch (error) {
        console.error(error)
      }

      if (!state) {
        this.initState()

        try {
          state = await this.getDataFromRedis(this.id)
        } catch (error) {
          console.error(error)
        }
      }

      const stateSector = this.getStateSector(sector, state)

      if (stateSector.open) {
        if (stateSector.players[this.currentPlayer.id] < 3) {
          stateSector.players[this.currentPlayer.id] += multiplicator
        }

        if (!stateSector.owner) {
          if (stateSector.players[this.currentPlayer.id] >= 3) {
            stateSector.owner = this.currentPlayer.id
          }

          this.currentPlayer.score += sector * multiplicator
        } else if (stateSector.owner === this.currentPlayer.id) {
          this.currentPlayer.score += sector * multiplicator
        }
      }

      if (Object.values(stateSector.players).every((value) => value >= 3)) {
        stateSector.open = false
      }

      this.setState(state)

      if (this.checkWin(state)) {
        this.rankCounter++
        this.currentPlayer.rank = this.rankCounter
        this.currentPlayer.inGame = false
      }
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

  checkWin(state) {
    const allSectorsValid = Object.keys(state).every(
      (sector) => state[sector].players[this.currentPlayer.id] >= 3
    )

    const highScore = this.gamePlayers.every(
      (gamePlayer) => this.currentPlayer.score >= gamePlayer.score
    )

    return allSectorsValid && highScore
  }

  isValidShot(sector, multiplicator) {
    if (!this.sector.includes(sector))
      throw new Error(
        `Le secteur que vous avez saisi (${sector}) n'est pas valide`
      )

    if ((sector === 25 || sector === 50) && multiplicator !== 1)
      throw new Error(
        `Le multiplicateur que vous avez saisi (${multiplicator}) n'est pas valide`
      )

    if (![1, 2, 3].includes(multiplicator))
      throw new Error(
        `Le multiplicateur que vous avez saisi (${multiplicator}) n'est pas valide`
      )
  }

  getDataFromRedis(gameId) {
    return new Promise((resolve, reject) => {
      redisClient.get(gameId, (error, cachedData) => {
        if (error) reject(error)
        if (cachedData != null) {
          resolve(JSON.parse(cachedData))
        }
        resolve()
      })
    })
  }

  initState() {
    const players = Object.assign(
      {},
      ...this.gamePlayers.map((gamePlayer) => ({
        [gamePlayer.id]: 0,
      }))
    )
    try {
      const state = {
        fifteen: {
          players,
          open: true,
          owner: null,
        },
        sixteen: {
          players,
          open: true,
          owner: null,
        },
        seventeen: {
          players,
          open: true,
          owner: null,
        },
        eighteen: {
          players,
          open: true,
          owner: null,
        },
        nineteen: {
          players,
          open: true,
          owner: null,
        },
        twenty: {
          players,
          open: true,
          owner: null,
        },
        twentyFive: {
          players,
          open: true,
          owner: null,
        },
        fifty: {
          players,
          open: true,
          owner: null,
        },
      }

      redisClient.setex(this.id, 3600, JSON.stringify(state))
    } catch (error) {
      console.error(error)
    }
  }

  setState(newState) {
    console.log(newState)
    try {
      redisClient.setex(this.id, 3600, JSON.stringify(newState))
    } catch (error) {
      console.error(error)
    }
  }

  getStateSector(sector, state) {
    switch (sector) {
      case 15:
        return state.fifteen
      case 16:
        return state.sixteen
      case 17:
        return state.seventeen
      case 18:
        return state.eighteen
      case 19:
        return state.nineteen
      case 20:
        return state.twenty
      case 25:
        return state.twentyFive
      default:
        return state.fifty
    }
  }
}

module.exports = Cricket
