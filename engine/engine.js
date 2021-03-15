const AroundTheWorld = require('./gamemodes/around-the-world')
const Cricket = require('./gamemodes/cricket')
const ThreeHundredAndOne = require('./gamemodes/301')

const players = [
  {
    id: 'u1',
    playerId: 1,
    gameId: 1,
    remainingShots: 3,
    score: 0,
    rank: null,
    order: 0,
    inGame: true,
    createdAt: Date.now(),
  },
  {
    id: 'u2',
    playerId: 2,
    gameId: 1,
    remainingShots: 3,
    score: 0,
    rank: null,
    order: 1,
    inGame: true,
    createdAt: Date.now(),
  },
  {
    id: 'u3',
    playerId: 3,
    gameId: 1,
    remainingShots: 3,
    score: 0,
    rank: null,
    order: 2,
    inGame: true,
    createdAt: Date.now(),
  },
]

const myGameMode = new Cricket('Partie 1')

myGameMode.gamePlayers = players
myGameMode.startGame()
myGameMode.setPlayersOrder()

const play = async () => {
  await myGameMode.shot(15, 2)
  await myGameMode.shot(18, 1)
  await myGameMode.shot(25, 1)
  console.log(myGameMode.gamePlayers)
}

play()

// console.log(myGameMode.gamePlayers)
// console.log('======================')
// console.log(myGameMode.currentPlayer)

// const state = {
//   fifteen: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
//   sixteen: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
//   seventeen: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
//   eighteen: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
//   nineteen: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
//   twenty: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
//   twentyFive: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
//   fifty: {
//     players: {
//       u1: 0,
//       u2: 0,
//       u3: 0,
//     },
//     open: true,
//     owner: null,
//   },
// }
