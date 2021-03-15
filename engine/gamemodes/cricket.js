const GameMode = require('../gamemode')
const redisClient = require('../../app')

class Cricket extends GameMode {
  constructor(name) {
    super(name)
    this.sector = [15, 16, 17, 18, 19, 20, 25, 50]
  }

  async shot(sector, multiplicator) {
    this.isStarted()
    this.isValidShot(sector, multiplicator)

    let data

    try {
      data = await this.getDataFromRedis('ddddd')
    } catch (error) {
      console.error(error)
    }

    console.log(data)

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

  checkWin(currentPlayer) {}

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
}

module.exports = Cricket
