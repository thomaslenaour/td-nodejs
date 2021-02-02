const AroundTheWorld = require('./gamemodes/around-the-world')

const myGameMode = new AroundTheWorld([
  { id: 'gyu1cnukzjbl', name: 'Théo' },
  { id: 'mmxaio49dnkl', name: 'Sascha' },
  { id: 'cjz02cnkl', name: 'Tln' },
  { id: 'cnjzcn8nialnx', name: 'Boiss' },
])

console.log(myGameMode.getFirstPlayer())
