var express = require('express');
var router = express.Router();


const tools = require('../tools')
const { shuffle } = tools


function database(db) {
  /* GET extract from database listing. */
  const data = JSON.stringify(db.data).slice(0, 100)
  router.get('/', function(req, res, next) {
    res.send(`Response from database: ${data}`);
  });

  /* GET a list of 24 random birds, with 0 at index 12*/
  router.get('/card', function(req, res, next) {
    const card = getCard()
    
    res.json(card);
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
}


module.exports = database;
