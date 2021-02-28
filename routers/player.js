const router = require('express').Router()
const { body } = require('express-validator')

const playerController = require('../controllers/player')

// PREFIX /players
router.get('/', playerController.showPlayers)
router.post(
  '/',
  [body('name').not().isEmpty(), body('email').normalizeEmail().isEmail()],
  playerController.createPlayer
)
router.get('/new', playerController.showPlayerForm)
router.get('/:id', playerController.getPlayer)
router.get('/:id/edit', playerController.showPlayerForm)
router.patch('/:id', (req, res, next) => {
  console.log('PATCH /players/{id}')
})
router.delete('/:id', (req, res, next) => {
  console.log('DELETE /players/{id}')
})

module.exports = router
