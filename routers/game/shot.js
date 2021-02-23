const router = require('express').Router()

const gamePlayerController = require('../../controllers/gamePlayer')

// PREFIX /games/:id
router.post('/shots', (req, res, next) => {
  console.log('POST /games/{id}/shots')
})
router.delete('/shots/previous', (req, res, next) => {
  console.log('DELETE /games/{id}/shots/previous')
})

module.exports = router
