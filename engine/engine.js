const AroundTheWorld = require('./gamemodes/around-the-world')
const Cricket = require('./gamemodes/cricket')
const ThreeHundredAndOne = require('./gamemodes/301')

const players = [
  {
    id: 1,
    playerId: 1,
    gameId: 1,
    remainingShots: 3,
    score: 2,
    rank: null,
    order: 0,
    inGame: true,
    createdAt: Date.now(),
  },
  {
    id: 2,
    playerId: 2,
    gameId: 1,
    remainingShots: 3,
    score: 19,
    rank: null,
    order: 2,
    inGame: true,
    createdAt: Date.now(),
  },
  {
    id: 3,
    playerId: 3,
    gameId: 1,
    remainingShots: 3,
    score: 19,
    rank: null,
    order: 1,
    inGame: true,
    createdAt: Date.now(),
  },
]

const myGameMode = new Cricket('Partie 1')

myGameMode.gamePlayers = players
myGameMode.startGame()
myGameMode.setPlayersOrder()

myGameMode.shot(20, 2)

// console.log(myGameMode.gamePlayers)
// console.log('======================')
// console.log(myGameMode.currentPlayer)
