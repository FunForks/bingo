import { usesState, useEffect, useReducer } from 'react'
import { initialState, reducer } from './api/gameplay'

import { PlayerName } from './components/PlayerName'
import { Card } from './components/Card'
import { Buttons } from './components/Buttons'

import { polling } from './api/polling'


const PORT = process.env.REACT_APP_BACKEND_PORT
const backend = window.location.origin.replace(/:\d+$/,`:${PORT}`)
const endPoints = {
  poll: `${backend}/data/poll`,
  start: `${backend}/data/start`,
  join: `${backend}/data/join`,
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


  const joinGameInProgress = async () => {

  }
  
  
  const claimBingo = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "player": state.player })
    }

    if (state.winner) {
      fetch(endPoints.bingo, options)
    }
  }
  useEffect(claimBingo, [state.winner])


  return (
    <>
      <PlayerName
        player={state.player}
        setPlayerName={setPlayerName}
      />
      <Card
        {...state}
      />
      <Buttons 
        startNewGame={startNewGame}
        joinGameInProgress={joinGameInProgress}
        claimBingo={claimBingo}
        {...state}
      />
      <span>
        {state.winner ? `Winner: ${state.winner}`
                      : state.latest
        }
      </span>
    </>
  );
}

export default App;
