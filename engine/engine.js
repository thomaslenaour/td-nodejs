/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const AroundTheWorld = require('./gamemodes/around-the-world')

const players = [
  { id: 'gyu1cnukzjbl', name: 'Théo', score: 0, win: false },
  { id: 'mmxaio49dnkl', name: 'Sascha', score: 0, win: false },
  { id: 'cjz02cnkl', name: 'Tln', score: 0, win: false },
  { id: 'cnjzcn8nialnx', name: 'Boiss', score: 0, win: false },
  { id: 'cnjzcn8nialnx', name: 'ddzdzdz', score: 20, win: false },
]

const myGameMode = new AroundTheWorld(players)

//  Si la cible visée est la bonne incrémenter score
//  Check si il y a un gagnant, si gagnant sortir de la boucle checkWin()
// end
