const HttpError = require('../models/http-error')

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

const showPlayersNew = async (req, res, next) => {
  res.format({
    json: () => next(new HttpError('NOT_API_AVAILABLE', 406)),
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
    json: () => next(new HttpError('NOT_API_AVAILABLE', 406)),
    html: () => res.render('players/edit'),
  })
}

exports.showPlayers = showPlayers
exports.showPlayersNew = showPlayersNew
exports.showPlayer = showPlayer
exports.showPlayerEdit = showPlayerEdit
