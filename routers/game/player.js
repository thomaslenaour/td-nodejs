const router = require('express').Router()

const gamePlayerController = require('../../controllers/gamePlayer')

// PREFIX /games/:id
router.get('/players', gamePlayerController.showGamePlayers)
router.post('/players', (req, res, next) => {
  console.log('POST /games/{id}/players')
})
router.delete('/players', (req, res, next) => {
  console.log('DELETE /games/{id}/players')
})

module.exports = router
