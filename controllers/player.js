const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Player = require('../models/player')

const showPlayers = async (req, res, next) => {
  const players = [
    {
      id: 1,
      name: 'Thomas',
      email: 'thomas.lenaour@ynov.com',
      gameWin: 10,
      gameLost: 3,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Alex',
      email: 'alex.boisseau@ynov.com',
      gameWin: 7,
      gameLost: 19,
      createdAt: new Date(),
    },
  ]

  res.format({
    json: () => res.json({ players }),
    html: () => res.render('players/players', { players }),
  })
}

const createPlayer = async (req, res, next) => {
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

  const { name, email } = req.body

  const createdPlayer = new Player({ name, email })

  try {
    await createdPlayer.save()
  } catch (error) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            "Impossible d'ajouter un nouveau joueur pour le moment",
            'SERVEUR_ERROR',
            500
          )
        ),
      html: () => res.redirect(302, '/players/new'),
    })
  }

  return res.format({
    json: () => res.status(201).json({ player: createdPlayer }),
    html: () => res.redirect(302, '/players/players'),
  })
}

const updateUser = async (req, res, next) => {
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
      html: () => res.redirect(302, '/games'),
    })
  }

  const { name, email } = req.body
  const { id } = req.params

  let player
  try {
    player = await Player.findById(id)
  } catch (err) {
    return res.format({
      json: () =>
        next(new HttpError("Le joueur n' a pas été trouvé", 'NOT_FOUND', 404)),
      html: () => res.redirect(302, '/games'),
    })
  }

  player.name = name
  player.email = email

  try {
    await player.save()
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
    json: () => res.status(200).json({ player }),
    html: () => res.redirect(302, '/players'),
  })
}

const getPlayer = async (req, res, next) => {
  const { id } = req.params

  let player
  try {
    player = await Player.findById(id)
  } catch (err) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            "Impossible de récupérer l'utilisateur pour le moment",
            'NOT_FOUND',
            404
          )
        ),
      html: () => res.redirect(302, '/games'),
    })
  }

  return res.format({
    json: () => res.json({ player }),
    html: () => res.redirect(302, `/players/${id}/edit`),
  })
}

const showPlayerForm = async (req, res, next) => {
  const { id } = req.params

  let player
  try {
    player = await Player.findById(id)
  } catch (err) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            "Impossible de récupérer l'utilisateur pour le moment",
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
      res.render('players/form-player', {
        player: player ? player.toObject({ getters: true }) : null,
      }),
  })
}

exports.showPlayers = showPlayers
exports.createPlayer = createPlayer
exports.getPlayer = getPlayer
exports.showPlayerForm = showPlayerForm
exports.updateUser = updateUser
