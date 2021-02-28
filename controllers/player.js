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
    return next(new HttpError('Les données saisies sont invalides', 422))
  }

  const { name, email } = req.body

  const createdPlayer = new Player({
    name,
    email,
  })

  try {
    await createdPlayer.save()
  } catch (error) {
    return next(
      new HttpError(
        "Impossible d'ajouter un nouveau joueur pour le moment",
        'SERVEUR_ERROR',
        500
      )
    )
  }

  return res.format({
    json: () => res.status(201).json({ player: createdPlayer }),
    html: () => res.redirect(302, 'players/players'),
  })
}

const showPlayersNew = async (req, res, next) => {
  res.format({
    json: () =>
      next(
        new HttpError(
          "Cette route n'est pas disponible",
          'NOT_API_AVAILABLE',
          406
        )
      ),
    html: () => res.render('players/new'),
  })
}

const showPlayer = async (req, res, next) => {
  const player = {
    id: 1,
    name: 'Thomas',
    email: 'thomas.lenaour@ynov.com',
    gameWin: 10,
    gameLost: 3,
    createdAt: new Date(),
  }

  res.format({
    json: () => res.json({ player }),
    html: () => res.render('players/show', { player }),
  })
}

const showPlayerEdit = async (req, res, next) => {
  res.format({
    json: () =>
      next(
        new HttpError(
          "Cette route n'est pas disponible",
          'NOT_API_AVAILABLE',
          406
        )
      ),
    html: () => res.render('players/edit'),
  })
}

exports.showPlayers = showPlayers
exports.createPlayer = createPlayer
exports.showPlayersNew = showPlayersNew
exports.showPlayer = showPlayer
exports.showPlayerEdit = showPlayerEdit
