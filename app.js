const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const hbs = require('hbs')

const HttpError = require('./models/http-error')

const app = express()

const gameRoutes = require('./routers/game')
const playerRoutes = require('./routers/player')

app.set('view engine', 'hbs')
hbs.registerHelper('javascripts', function (options) {
  return options.fn(this)
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

// Endpoints
app.get('/', (req, res, next) => {
  return res.format({
    json: () =>
      next(
        new HttpError(
          "Cette route n'est pas disponible",
          'API_NOT_AVAILABLE',
          406
        )
      ),
    html: () => res.redirect(301, '/games'),
  })
})
app.use('/games', gameRoutes)
app.use('/players', playerRoutes)

app.use((req, res, next) => {
  throw new HttpError("La route n'existe pas", 'NOT_FOUND', 404)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  return res.status(error.code || 500).json({
    error: {
      type: error.type || 'UNKNOWN_TYPE',
      message: error.message || 'Une erreur inconnue est survenue !',
    },
  })
})

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dart-game-cluster.bryxd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err))
