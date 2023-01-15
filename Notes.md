# Notes
 
To play, the player needs a name, a card, and an active game.
There should be a Start New Game button if the server is not using setInterval to draw cards 
Calling the /data/start endpoint starts the game
All players should receive a message { action: "GAME_STARTED" } (no payload necessary)
This should replace the Start New Game button with a Bingo! button

A player who requests a card while a game is in progress should receive an array of drawn items at the same time as the card data. Long polling should also start automatically, so that they are kept up to date as new items are drawn.

They should see a button Join Game In Progress. If they click on this:
* The Join Game button should be replaced by a Bingo! button
* All items that have already been drawn should be matched in their display
* The table should become interactive: now the player has to press items as they are called

The Bingo! button will always be active, and can be pressed even if no Bingo is present. When Bingo! is pressed, the client sends the players card array and the player's name to the server, which checks if there is indeed a valid claim. If so, it:

* clears the interval (to stop the game)
* sends an update({ type: "WINNER", payload: <Winner's name> })
  
This replaces the current Bingo! button with Start New Game.