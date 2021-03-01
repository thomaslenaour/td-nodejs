const router = require('express').Router()
const { body } = require('express-validator')

const gamePlayerController = require('../../controllers/gamePlayer')

// PREFIX /games
router.get('/:id/players', gamePlayerController.showGamePlayers)
router.post(
  '/:id/players',
  [body('players').not().isEmpty()],
  gamePlayerController.createGamePlayer
)
router.delete('/:gameId/players', gamePlayerController.deleteGamePlayer)

module.exports = router
