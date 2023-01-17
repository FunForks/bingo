import { usesState, useEffect, useReducer } from 'react'
import { initialState, reducer } from './api/gameplay'

import { PlayerName } from './components/PlayerName'
import { Card } from './components/Card'
import { Buttons } from './components/Buttons'

import { polling } from './api/polling'
import { say } from './api/textToSpeech.js'



const PORT = process.env.REACT_APP_BACKEND_PORT
const backend = window.location.origin.replace(/:\d+$/,`:${PORT}`)
const endPoints = {
  poll: `${backend}/data/poll`,
  start: `${backend}/data/start`,
  join: `${backend}/data/join`,   // not used yet
  bingo: `${backend}/data/bingo`
}

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)


  // Initialization
  const pollingCallback = json => {
    dispatch(json)
  }

  useEffect(() => polling(endPoints.poll, pollingCallback), [])


  const setPlayerName = (event) => {
    const payload = event.target.value
    dispatch({
      type: "SET_PLAYER_NAME",
      payload
    })
  }


  // Talking to the backend
  const startNewGame = async () => {
    fetch(endPoints.start)
    // Response from backend will trigger pollingCallback with {
    //   action: "GAME_STARTED"
    //   card: <array of arrays>
    // }
  }


  const announceDraw = () => {
    if (state.latest) {
      say(state.latest)
    }
  }
  useEffect(announceDraw, [state.latest])


  const joinGameInProgress = async () => {

  }


  const setMatch = (row, column) => {
    dispatch({
      type: "SET_MATCH",
      payload: { row, column }
    })
  }


  const callBingo = () => {
    dispatch({
      type: "CALL_BINGO"
    })
  }


  const claimBingo = async () => {
    const { winner } = state // "" | true | -1 | "<player name>"

    if (winner === true) {
      // This player clicked the Bingo! button with a valid claim
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "player": state.player })
      }

      fetch(endPoints.bingo, options)

    } else if (winner && typeof winner === "string") {
      say(`The winner is: ${winner}`)
    }
  }
  useEffect(claimBingo, [state.winner])


  const display = (() => {
    if (state.winner) {
      if (state.winner < 0) {
        return "Bingo called in error"
      } else {
        return state.winner
      }
    } else {
      return state.latest
    }
  })()


  return (
    <>
      <PlayerName
        player={state.player}
        setPlayerName={setPlayerName}
      />
      <Card
        {...state}
        setMatch={setMatch}
      />
      <Buttons
        startNewGame={startNewGame}
        joinGameInProgress={joinGameInProgress}
        callBingo={callBingo}
        {...state}
      />
      <span>
        {display}
      </span>
    </>
  );
}

export default App;
