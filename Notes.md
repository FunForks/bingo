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

A player who requests a card while a game is in progress receives an array of drawn items at the same time as the card data. Long polling also starts automatically, so that they are kept up to date as new items are drawn. However, the Bingo! button is blocked, so a player cannot claim to win a game that they did not play from the beginning

TODO

1. Highlight winning Bingo lines
2. Detect multiple winning lines, if present
3. Set an item to matched when pressed, even if that item has not been drawn. (Perhaps show it in a different colour?). When the player press Bingo!, remove the "match" from all mistaken items.
4. Show a countdown progress bar before the first item is drawn.
5. textToSpeech audio is not permitted until the user interacts with the page. Add a button for the player to press so that sound is activated.
6. Use images as prompts or as cues, so that the player must select the image that matches the name, or vice versa. When matched, both the image and the word will appear.
7. Handle error if backend is not running.