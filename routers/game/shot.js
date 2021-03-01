const router = require('express').Router()

const gamePlayerController = require('../../controllers/gamePlayer')

// PREFIX /games/:id
router.post('/:id/shots', (req, res, next) => {
  console.log('POST /games/{id}/shots')
})
router.delete('/:id/shots/previous', (req, res, next) => {
  console.log('DELETE /games/{id}/shots/previous')
})

module.exports = router
