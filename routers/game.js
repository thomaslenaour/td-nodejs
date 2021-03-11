const router = require('express').Router()
const { body } = require('express-validator')

const gamePlayerRoutes = require('./game/player')
const shotRoutes = require('./game/shot')

const gameController = require('../controllers/game')

// PREFIX /games
router.get('/', gameController.showGames)
router.get('/new', gameController.showGameForm)
router.post(
  '/',
  [
    body('name').not().isEmpty(),
    body('mode').isIn(['around-the-world', '301', 'cricket']),
  ],
  gameController.createGame
)
router.get('/:id', gameController.showGame)
router.get('/:id/edit', gameController.showGameForm)
router.patch(
  '/:id',
  [
    body('name').not().isEmpty(),
    body('mode').isIn(['around-the-world', '301', 'cricket']),
    body('status').isIn(['started', 'draft', 'ended']),
  ],
  gameController.updateGame
)
router.delete('/:id', gameController.deleteGame)

router.use('/', gamePlayerRoutes)
router.use('/', shotRoutes)

module.exports = router
