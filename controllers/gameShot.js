const ThreeHundredAndOne = require('../engine/gamemodes/301')
const AroundTheWorld = require('../engine/gamemodes/around-the-world')
const Game = require('../models/game')
const GamePlayer = require('../models/gamePlayer')
const HttpError = require('../models/http-error')

const createShot = async (req, res, next) => {
  const { id } = req.params
  const { sector, multiplicator } = req.body

  let game
  try {
    game = await Game.findById(id).populate('currentPlayerId')
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

  if (game.status === 'ended') {
    return res.format({
      json: () =>
        next(new HttpError('La partie est terminée', 'GAME_ENDED', 422)),
      html: () => res.redirect(302, `/games/${id}`),
    })
  }

  if (game.status === 'draft') {
    return res.format({
      json: () =>
        next(new HttpError('La partie est terminée', 'GAME_NOT_STARTED', 422)),
      html: () => res.redirect(302, `/games/${id}`),
    })
  }

  let gamePlayers
  try {
    gamePlayers = await GamePlayer.find({ gameId: id })
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
      html: () => res.render('players/new'),
    })
  }

  let currentGame
  switch (game.mode) {
    case 'around-the-world':
      currentGame = new AroundTheWorld(game.name)
      break
    case '301':
      currentGame = new ThreeHundredAndOne(game.name)
      break
    default:
      currentGame = null
      break
  }

  currentGame.status = game.status
  currentGame.gamePlayers = gamePlayers
  currentGame.rankCounter = currentGame.gamePlayers.reduce((acc, val) =>
    acc.rank > val.rank ? acc : val
  ).rank
  currentGame.currentPlayer = currentGame.gamePlayers.find(
    (gamePlayer) => gamePlayer.order === game.currentPlayerId.order
  )

  currentGame.shot(sector, multiplicator)

  try {
    gamePlayers.forEach(async (gamePlayer) => {
      await gamePlayer.save()
    })
  } catch (err) {
    console.error(err)
  }

  game.currentPlayerId = currentGame.currentPlayer.id
  try {
    await game.save()
  } catch (err) {
    console.error(err)
  }

  if (currentGame.status === 'ended') {
    game.status = 'ended'
    try {
      await game.save()
    } catch (err) {
      console.error(err)
    }
  }

  return res.format({
    json: () => res.json().status(204),
    html: () => res.redirect(302, `/games/${game.id}`),
  })
}

exports.createShot = createShot
