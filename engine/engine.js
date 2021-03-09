const AroundTheWorld = require('./gamemodes/around-the-world')
const ThreeHundredAndOne = require('./gamemodes/301')

const players = [
  {
    id: 1,
    playerId: 1,
    gameId: 1,
    remainingShots: 3,
    score: 301,
    rank: null,
    order: null,
    inGame: true,
    createdAt: Date.now(),
  },
  {
    id: 2,
    playerId: 2,
    gameId: 1,
    remainingShots: 3,
    score: 301,
    rank: null,
    order: null,
    inGame: true,
    createdAt: Date.now(),
  },
  {
    id: 3,
    playerId: 3,
    gameId: 1,
    remainingShots: 3,
    score: 301,
    rank: null,
    order: null,
    inGame: true,
    createdAt: Date.now(),
  },
]

const myGameMode = new ThreeHundredAndOne('Partie 1')

myGameMode.addPlayer(players[0])
myGameMode.addPlayer(players[1])
myGameMode.addPlayer(players[2])
myGameMode.setPlayersOrder()
myGameMode.startGame()

myGameMode.shot(10, 2)
myGameMode.shot(18, 3)
myGameMode.shot(10, 1)
myGameMode.shot(10, 1)

console.log(myGameMode.gamePlayers)
