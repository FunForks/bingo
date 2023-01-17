# Notes

To play, the player needs a name, a card, and an active game.
There should be a Start New Game button if the server is not using setInterval to draw cards
Calling the /data/start endpoint starts the game
All players should receive a message { action: "GAME_STARTED" } (no payload necessary)
This should replace the Start New Game button with a Bingo! button

The Bingo! button will always be active, and can be pressed even if no Bingo is present. When Bingo! is pressed, the client checks locally if there is a valid claaim. If so, the player's name is sont to the server, which:

* clears the interval (to stop the game)
* sends an update({ type: "WINNER", payload: <Winner's name> })

This replaces the current Bingo! button with Start New Game.


TODO

1. A player who requests a card while a game is in progress should receive an array of drawn items at the same time as the card data. Long polling should also start automatically, so that they are kept up to date as new items are drawn.

  They should see a button Join Game In Progress. If they click on this:
  * The Join Game button should be replaced by a Bingo! button
  * All items that have already been drawn should be matched in their display
  * The table should become interactive: now the player has to press items as they are called

2. Highlight winning Bingo lines
3. Detect multiple winning lines, if present
4. Utter the winner's name
5. Set an item to matched when pressed, even if that item has not been drawn. (Perhaps show it in a different colour?). When the player press Bingo!, remove the "match" from all mistaken items.
6. Show a countdown progress bar before the first item is drawn.
7. Show a button to press if textToSpeech audio is not permitted to play until the user interacts with the page