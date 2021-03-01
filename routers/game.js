const router = require('express').Router()
const { body } = require('express-validator')

const gamePlayerRoutes = require('./game/player')
const shotRoutes = require('./game/shot')

const gameController = require('../controllers/game')

// PREFIX /games
router.get('/', gameController.showGames)
router.get('/new', gameController.showGameNew)
router.post(
  '/',
  [
    body('name').not().isEmpty(),
    body('mode').isIn(['around-the-world', '301', 'cricket']),
  ],
  gameController.createGame
)
router.get('/:id', gameController.showGame)
router.get('/:id/edit', gameController.showGameEdit)
router.patch('/:id', (req, res, next) => {
  console.log('PATCH /games/{id}')
})
router.delete('/:id', (req, res, next) => {
  console.log('DELETE /games/{id}')
})

router.use('/', gamePlayerRoutes)
router.use('/', shotRoutes)

module.exports = router
