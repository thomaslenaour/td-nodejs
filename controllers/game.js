const HttpError = require('../models/http-error')

const showGames = async (req, res, next) => {
  const games = []

  res.format({
    json: () => res.json({ games }),
    html: () => res.render('games', { games }),
  })
}

const showGamesNew = async (req, res, next) => {
  res.format({
    json: () => next(new HttpError('NOT_API_AVAILABLE', 406)),
    html: () => res.render('games/new'),
  })
}

const showGame = async (req, res, next) => {
  const game = {
    id: 1,
    mode: 'around-the-world',
    name: 'partie 1',
    currentPlayerId: 1,
    status: 'draft',
    createdAt: Date.now(),
    enginePayload: {},
  }

  res.format({
    json: () => res.json({ game }),
    html: () => res.render('games/show'),
  })
}

exports.showGames = showGames
exports.showGamesNew = showGamesNew
exports.showGame = showGame
