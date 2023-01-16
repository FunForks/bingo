var express = require('express');
var router = express.Router();


const tools = require('../tools')
const { shuffle } = tools

const pollResponses = []

const DRAW_DELAY = 100
let interval = 0



function database(db) {

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
      db.data.pool = shuffle([...db.data.birds])
      db.data.drawn = []
      await db.write()

      update("GAME_STARTED")

      interval = setInterval(draw, DRAW_DELAY)
    }

    res.send("OK") // so that the client is not left hanging
  });


  /* GET the game to start for all connected players */
  router.get('/bingo', async function(req, res, next) {

    if (interval) {
      clearInterval(interval)
      interval = 0
    }

    res.send("OK") // so that the client is not left hanging
  });

  return router


  function getCard() {
    const { birds } = db.data
    // Shuffle all the birds, and choose the first 24..
    const shuffled = shuffle([...birds])
                    .slice(0,24)

    // ... then add a zero in the middle
    shuffled.splice(12, 0, 0)
    const card = [
      shuffled.splice(0, 5),
      shuffled.splice(0, 5),
      shuffled.splice(0, 5), // zero is in the middle
      shuffled.splice(0, 5),
      shuffled.splice(0, 5)
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
