const router = require('express').Router()

const gameController = require('../controllers/game')

// PREFIX /games
router.get('/', gameController.showGames)
router.get('/new', gameController.showGamesNew)
router.post('/', (req, res, next) => {
  console.log('POST /games')
})
router.get('/{id}', (req, res, next) => {
  console.log('GET /games/{id}')
})
router.get('/{id}/edit', (req, res, next) => {
  console.log('GET /games/{id}/edit')
})
router.patch('/{id}', (req, res, next) => {
  console.log('PATCH /games/{id}')
})
router.delete('/{id}', (req, res, next) => {
  console.log('DELETE /games/{id}')
})

module.exports = router
