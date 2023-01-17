/**
 * Buttons.jsx
 */

export const Buttons = (props) => {
  const {
    // Functions to talk to backend
    startNewGame,
    joinGameInProgress,
    claimBingo,
    // Flags for the current state of play
    playing,
    inProgress,
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
          onClick={claimBingo}
          disabled={disabled}
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
            Join the Game
          </button>
        </>
      )
    }
  })()
  

  return buttons
}