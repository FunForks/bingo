import { useEffect, useReducer } from 'react'
import { initialState, reducer } from './api/gameplay'

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

  useEffect(() => polling(endPoints.poll, pollingCallback ), [])


  // Talking to the backend
  const startNewGame = async () => {
    fetch(endPoints.start)
  }


  const joinGameInProgress = async () => {

  }
  
  
  const claimBingo = async () => {
    if (state.winner) {
      fetch(endPoints.bingo)
    }
  }
  useEffect(claimBingo, [state.winner])


  return (
    <>
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
        {state.latest}
      </span>
    </>
  );
}

export default App;
