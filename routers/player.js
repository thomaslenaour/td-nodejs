const router = require('express').Router()

const playerController = require('../controllers/player')

// PREFIX /players
router.get('/', playerController.showPlayers)
router.post('/', (req, res, next) => {
  console.log('POST /players')
})
router.get('/new', playerController.showPlayersNew)
router.get('/:id', playerController.showPlayer)
router.get('/:id/edit', playerController.showPlayerEdit)
router.patch('/:id', (req, res, next) => {
  console.log('PATCH /players/{id}')
})
router.delete('/:id', (req, res, next) => {
  console.log('DELETE /players/{id}')
})

module.exports = router
