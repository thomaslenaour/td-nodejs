const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Game = require('../models/game')

const showGames = async (req, res, next) => {
  let games
  try {
    games = await Game.find()
  } catch (error) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Impossible de récupérer les données des joueurs',
            'NOT_FOUND',
            404
          )
        ),
      html: () => res.render('games/index', { games }),
    })
  }

  return res.format({
    json: () =>
      res.json({
        games: games.map((game) => game.toObject({ getters: true })),
      }),
    html: () =>
      res.render('games/index', {
        games: games.map((game) => game.toObject({ getters: true })),
      }),
  })
}

const showGameNew = async (req, res, next) => {
  res.format({
    json: () =>
      next(
        new HttpError(
          "Cette route n'est pas disponible",
          'NOT_API_AVAILABLE',
          406
        )
      ),
    html: () => res.render('games/new'),
  })
}

const createGame = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Les données saisies sont invalides',
            'UNPROCESSABLE_ENTITY',
            422
          )
        ),
      html: () => res.redirect(302, 'players/new'),
    })
  }

  const { name, mode } = req.body

  const createdGame = new Game({ name, mode })

  try {
    await createdGame.save()
  } catch (error) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Impossible de créer une partie pour le moment',
            'SERVEUR_ERROR',
            500
          )
        ),
      html: () => res.redirect(302, '/games'),
    })
  }

  return res.format({
    json: () =>
      res.status(201).json({ game: createdGame.toObject({ getters: true }) }),
    html: () => res.redirect(302, `/games/${createdGame.id}`),
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

const showGameEdit = async (req, res, next) => {
  res.format({
    json: () =>
      next(
        new HttpError(
          "Cette route n'est pas disponible",
          'NOT_API_AVAILABLE',
          406
        )
      ),
    html: () => res.render('games/edit'),
  })
}

exports.showGames = showGames
exports.showGameNew = showGameNew
exports.createGame = createGame
exports.showGame = showGame
exports.showGameEdit = showGameEdit
