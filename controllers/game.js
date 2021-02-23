const showGames = async (req, res, next) => {
  const games = []

  res.format({
    json: () => res.json({ games }),
    html: () => res.render('games', { games }),
  })
}

exports.showGames = showGames
