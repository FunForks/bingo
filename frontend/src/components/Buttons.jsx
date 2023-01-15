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
    inProgress
  } = props

  const buttons = (() => {
      if (!inProgress) {
      return (
        <button
          onClick={startNewGame}
        >
          Start New Game
        </button>
      )

    } else if (playing) {   
      return (
        <button
          onClick={claimBingo}
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
          >
            Join the Game
          </button>
        </>
      )
    }
  })()
  

  return buttons
}