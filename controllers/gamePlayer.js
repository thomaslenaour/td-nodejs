const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Game = require('../models/game')
const Player = require('../models/player')
const GamePlayer = require('../models/gamePlayer')

const showGamePlayers = async (req, res, next) => {
  const { id } = req.params

  let game
  try {
    game = await Game.findById(id)
  } catch (err) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Aucune partie correspondant à cet identificant',
            'NOT_FOUND',
            404
          )
        ),
      html: () => res.redirect(302, '/games'),
    })
  }

  let playersInGame
  try {
    playersInGame = await GamePlayer.find({ gameId: id })
      .populate('playerId')
      .select('playerId -_id')
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

  const idsPlayersInGame = playersInGame.map((player) =>
    player.playerId._id.toString()
  )

  let allPlayers
  try {
    allPlayers = await Player.find()
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

  let availablePlayers = allPlayers
  if (idsPlayersInGame.length > 0) {
    availablePlayers = allPlayers.filter(
      (player) => !idsPlayersInGame.includes(player._id.toString())
    )
  }

  return res.format({
    json: () =>
      res.json({
        players: availablePlayers.map((player) =>
          player.toObject({ getters: true })
        ),
      }),
    html: () =>
      res.render('games/players/index', {
        game: game.toObject({ getters: true }),
        playersInGame: playersInGame.map((player) =>
          player.toObject({ getters: true })
        ),
        availablePlayers: availablePlayers.map((player) =>
          player.toObject({ getters: true })
        ),
      }),
  })
}

const createGamePlayer = async (req, res, next) => {
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

  const { id } = req.params

  let game
  try {
    game = await Game.findById(id)
  } catch (err) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Aucune partie correspondant à cet identificant',
            'NOT_FOUND',
            404
          )
        ),
      html: () => res.redirect(302, '/games'),
    })
  }

  if (game.status !== 'draft') {
    return res.format({
      json: () =>
        next(
          new HttpError(
            "Impossible d'ajouter des joueurs, la partie est déjà en cours",
            'PLAYERS_NOT_ADDABLE_GAME_STARTED',
            422
          )
        ),
      html: () => res.redirect(302, `/games/${id}`),
    })
  }

  const { players } = req.body

  let score
  if (game.mode === 'around-the-world') score = 0
  else if (game.mode === '301') score = 301
  else score = 0

  let playersToAdd = []
  if (!Array.isArray(players))
    playersToAdd.push({
      playerId: players,
      gameId: id,
      score,
      createdAt: new Date().getTime(),
    })
  else
    playersToAdd = players.map((playerId) => ({
      playerId,
      gameId: id,
      score,
      createdAt: new Date().getTime(),
    }))

  try {
    await GamePlayer.insertMany(playersToAdd)
  } catch (error) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            "Impossible d'ajouter les nouveaux joueurs pour le moment",
            'SERVEUR_ERROR',
            500
          )
        ),
      html: () => res.redirect(302, '/players/new'),
    })
  }

  return res.format({
    json: () => res.status(204),
    html: () => res.redirect(302, `/games/${id}/players`),
  })
}

const deleteGamePlayer = async (req, res, next) => {
  const idsToDelete = Array.isArray(req.query.id)
    ? req.query.id
    : [req.query.id]
  const { gameId } = req.params

  let game
  try {
    game = await Game.findById(gameId)
  } catch (err) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Aucune partie correspondant à cet identificant',
            'NOT_FOUND',
            404
          )
        ),
      html: () => res.redirect(302, '/games'),
    })
  }

  if (game.status !== 'draft') {
    return res.format({
      json: () =>
        next(
          new HttpError(
            "Impossible d'ajouter des joueurs, la partie est déjà en cours",
            'PLAYERS_NOT_ADDABLE_GAME_STARTED',
            422
          )
        ),
      html: () => res.redirect(302, `/games/${gameId}`),
    })
  }

  try {
    await GamePlayer.deleteMany({ playerId: { $in: idsToDelete } })
  } catch (error) {
    return res.format({
      json: () =>
        next(
          new HttpError(
            'Impossible de supprimer les joueurs pour le moment',
            'SERVEUR_ERROR',
            500
          )
        ),
      html: () => res.redirect(302, '/players/new'),
    })
  }

  return res.format({
    json: () => res.status(204).json(),
    html: () => res.redirect(302, `/games/${gameId}/players`),
  })
}

exports.showGamePlayers = showGamePlayers
exports.createGamePlayer = createGamePlayer
exports.deleteGamePlayer = deleteGamePlayer
