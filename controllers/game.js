const { validationResult } = require('express-validator')

const { Mongoose } = require('mongoose')
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

const updateGame = async (req, res, next) => {
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

  const { name, mode, status } = req.body
  const { id } = req.params

  let game
  try {
    game = await Game.findById(id)
  } catch (err) {
    return res.format({
      json: () =>
        next(new HttpError("La partie n' a pas été trouvée", 'NOT_FOUND', 404)),
      html: () => res.redirect(302, '/games'),
    })
  }

  if (game.status === 'started') {
    console.log('Il n’est plus possible de modifier cette partie')
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Il n’est plus possible de modifier cette partie',
            'GAME_NOT_EDITABLE',
            410
          )
        ),
      html: () => res.redirect(302, 'players/new'),
    })
  }

  if (
    (game.status === 'started' || game.status === 'ended') &&
    status === 'started'
  ) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Cette partie est lancée ou est déjà terminée',
            'GAME_NOT_STARTABLE',
            422
          )
        ),
      html: () => res.redirect(302, 'players/new'),
    })
  }

  game.name = name
  game.mode = mode
  game.status = status

  try {
    await game.save()
  } catch (err) {
    return res.format({
      json: () =>
        next(
          new HttpError('Une erreur a été rencontrée', 'SERVEUR_ERROR', 500)
        ),
      html: () => res.redirect(302, '/games'),
    })
  }

  return res.format({
    json: () => res.status(200).json({ game }),
    html: () => res.redirect(302, '/games'),
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

const showGameForm = async (req, res, next) => {
  const { id } = req.params

  let game
  try {
    game = await Game.findById(id)
  } catch (err) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Impossible de récupérer la partie pour le moment',
            'SERVEUR_ERROR',
            404
          )
        ),
      html: () => res.redirect(302, '/games'),
    })
  }

  return res.format({
    json: () =>
      next(
        new HttpError(
          "Cette route n'est pas disponible",
          'NOT_API_AVAILABLE',
          406
        )
      ),
    html: () =>
      res.render('games/form-game', {
        game: game ? game.toObject({ getters: true }) : null,
      }),
  })
}

exports.showGames = showGames
exports.createGame = createGame
exports.showGame = showGame
exports.showGameForm = showGameForm
exports.updateGame = updateGame
