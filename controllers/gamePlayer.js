const HttpError = require('../models/http-error')

const showGamePlayers = async (req, res, next) => {
  const players = []

  res.format({
    json: () => res.json({ players }),
    html: () => res.render('games/players/index', { players }),
  })
}

exports.showGamePlayers = showGamePlayers
