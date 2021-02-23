const router = require('express').Router()

const gamePlayerRoutes = require('./game/player')
const shotRoutes = require('./game/shot')

const gameController = require('../controllers/game')

// PREFIX /games
router.get('/', gameController.showGames)
router.get('/new', gameController.showGameNew)
router.post('/', (req, res, next) => {
  console.log('POST /games')
})
router.get('/:id', gameController.showGame)
router.get('/:id/edit', gameController.showGameEdit)
router.patch('/:id', (req, res, next) => {
  console.log('PATCH /games/{id}')
})
router.delete('/:id', (req, res, next) => {
  console.log('DELETE /games/{id}')
})

router.use('/:id', gamePlayerRoutes)
router.use('/:id', shotRoutes)

module.exports = router
