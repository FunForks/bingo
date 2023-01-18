# Notes

To play, the player needs a name, a card, and an active game.

A Start New Game button is shown if a game is not in progress (if the server is not currently using setInterval to draw cards).

Calling the /start endpoint starts the game.

All connected players receive a message { action: "GAME_STARTED", card: <array of arrays> }. The card array provides the name and an image url for each cell in the Bingo card.

When the game starts, the Start New Game button is replaced with a Bingo! button.

The Bingo! button will always be active, and can be pressed even if no Bingo line is present. When Bingo! is pressed, the client checks locally if there is a valid claaim.

If so, the player's name is sent to the server, which:
* clears the interval (to stop the game)
* sends an update({ type: "WINNER", payload: <Winner's name> })

This tells the frontend to replace the current Bingo! button with Start New Game.

If there is no valid Bingo line, then:
* the Bingo! button is disabled
* a message saying that Bingo was claimed in error is shown
* the game continues to update automatically (with no user interactions)

A player who requests a card while a game is in progress receives an array of drawn items at the same time as the card data. Long polling also starts automatically, so that they are kept up to date as new items are drawn. However, the Bingo! button is blocked, so a player cannot claim to win a game that they did not play from the beginning

TODO

1. Highlight winning Bingo lines
2. Detect multiple winning lines, if present
3. Set an item to "matched" when pressed, _even if that item has not been drawn_. (Perhaps show it in a different colour?). When the player presses Bingo!, remove the "match" from all mistaken items.
4. Give immediate feedback that the game has begun. For example: show a countdown progress bar before the first item is drawn.
5. For courtesy reasons, textToSpeech audio is not permitted until the user interacts with the page. Add a button for the player to press so that sound is activated.
6. Handle error if the backend is not running.