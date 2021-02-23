const express = require('express')
const path = require('path')

const HttpError = require('./models/http-error')

const app = express()

const gameRoutes = require('./routers/game')
const playerRoutes = require('./routers/player')

app.set('view engine', 'hbs')
app.use(express.json())

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
    json: () => next(new HttpError('API_NOT_AVAILABLE', 406)),
    html: () => res.redirect('/games', 301),
  })
})
app.use('/games', gameRoutes)
app.use('/players', playerRoutes)

app.use((req, res, next) => {
  throw new HttpError("La route n'existe pas", 404)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  return res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occured!' })
})

app.listen(process.env.PORT || 5000)
