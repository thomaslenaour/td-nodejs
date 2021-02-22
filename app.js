const express = require('express')

const app = express()

const gameRoutes = require('./routers/game')

app.set('view engine', 'hbs')

app.use('/assets', express.static('assets'))

// Endpoints
app.use('/games', gameRoutes)

app.listen(process.env.PORT || 5000)
