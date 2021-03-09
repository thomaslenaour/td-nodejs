const router = require('express').Router()

const gameShotController = require('../../controllers/gameShot')

// PREFIX /games/:id
router.post('/:id/shots', gameShotController.createShot)

router.delete('/:id/shots/previous', (req, res, next) => {
  console.log('DELETE /games/{id}/shots/previous')
})

module.exports = router
