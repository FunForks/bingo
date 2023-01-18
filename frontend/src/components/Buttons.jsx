/**
 * Buttons.jsx
 */

export const Buttons = (props) => {
  const {
    // Functions to talk to backend
    startNewGame,
    joinGameInProgress,
    callBingo,
    // Flags for the current state of play
    playing,
    inProgress,
    winner,     // 0 | 1 (Bingo found) | -1 (false Bingo claim)
    // String used as flag for enabling the button
    player
  } = props

  const disabled = !player

  const buttons = (() => {
    if (!inProgress) {
      return (
        <button
          onClick={startNewGame}
          disabled={disabled}
        >
          Start New Game
        </button>
      )

    } else if (playing) {   
      return (
        <button
          onClick={callBingo}
          disabled={disabled || winner < 0}
        >
          Bingo!
        </button>
      )

    } else {
      return (
        <>
          <span>
            A game is already in progress.
          </span>
          <button
            onClick={joinGameInProgress}
            disabled={disabled}
          >
            Watch the Game
          </button>
        </>
      )
    }
  })()
  

  return buttons
}