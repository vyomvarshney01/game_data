const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const cors = require('cors');

const { getAllGames, getGameById } = require('./controllers');
app.use(cors());
app.use(express.json());

// Endpoint to get all games
app.get('/games', async (req, res) => {
  try {
    const games = getAllGames();
    if (games.length === 0) {
      res.status(400).json('No game details found');
    }
    res.status(200).json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get game detalls by id
app.get('/games/details/:id', async (req, res) => {
  try {
    let game = getGameById(parseInt(req.params.id));
    if (game.length === 0) {
      res.status(400).json('No game detail found by this id');
    }
    res.status(200).json({
      game,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
