var express = require('express');
var router = express.Router();


const tools = require('../tools')
const { shuffle } = tools

const pollResponses = []

const DRAW_DELAY = 3000
let interval = 0



function database(db) {

  const birdMap = db.data.birds
  const birdNames = Object.keys(db.data.birds)

  /* GET extract from database listing. */
  const data = JSON.stringify(db.data).slice(0, 100)
  router.get('/', function(req, res, next) {
    res.send(`Extract from database: ${data}`);
  });

  /* Store a POST request for an async response from draw() */
  router.post('/poll', function(req, res, next) {
    pollResponses.push(res)
  });

  /* GET the game to start for all connected players */
  router.get('/start', async function(req, res, next) {

    if (!interval) {
      db.data.pool = shuffle([...birdNames])
      db.data.drawn = []
      await db.write()

      update("GAME_STARTED")

      interval = setInterval(draw, DRAW_DELAY)
    }

    res.send("OK") // so that the client is not left hanging
  });


  /* GET the game to start for all connected players */
  router.post('/bingo', function(req, res, next) {
    const { player } = req.body

    if (interval) {
      clearInterval(interval)
      interval = 0

      update("GAME_OVER", player)
    }

    res.send("OK") // so that the client is not left hanging
  });


  /* GET a card and the array of items that have
   * already been drawn
   */
  router.get('/join', async function(req, res, next) {
    const card = getCard()
    const { drawn } = db.data
    const message = {
      type: "JOIN_GAME",
      payload: { card, drawn }
    }
    res.json(message)
  });

  return router



  function getCard() {
    // Shuffle all the bird names, and choose the first 24..
    const shuffled = shuffle([...birdNames])
                    .slice(0,24)
                    .sort() // random birds in alphabetical order

    // ... then add a zero in the middle
    shuffled.splice(12, 0, 0)

    // Add url for each bird name
    const mapping =  name => {
      const url = name
                ? birdMap[name]
                : ""
      return { name, url }
    }

    let card = [
      shuffled.splice(0, 5).map(mapping),
      shuffled.splice(0, 5).map(mapping),
      shuffled.splice(0, 5).map(mapping), // zero is in the middle
      shuffled.splice(0, 5).map(mapping),
      shuffled.splice(0, 5).map(mapping)
    ]

    return card
  }



  async function draw() {
    const pool = db.data.pool
    const drawn = pool.pop()

    if (!drawn) {
      clearInterval(interval)
      interval = 0

      return update("GAME_OVER")
    }

    db.data.pool = pool
    db.data.drawn.push(drawn)
    await db.write()

    update("DRAW", drawn)
  }



  function update(type, payload) {
    let response
    while (response = pollResponses.shift()) {
      if (type === "GAME_STARTED") {
        // Create a new card for each player
        payload = getCard()
      }

      response.send({ type, payload })
    }
  }
}


module.exports = database;
