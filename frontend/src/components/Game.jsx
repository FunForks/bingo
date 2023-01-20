/**
 * Game.jsx
 *
 * 
 */
 
import {  useEffect, useReducer } from 'react'
import { initialState, reducer } from '../api/gameplay'

import { PlayerName } from './PlayerName'
import { Card } from './Card'
import { Buttons } from './Buttons'

import { polling } from '../api/polling'
import { say } from '../api/textToSpeech.js'



export const Game = ({ endPoints, inProgress }) => {
  initialState.inProgress = inProgress
  const [ state, dispatch ] = useReducer(reducer, initialState)
  

  // Initialization
  const pollingCallback = json => {
    console.log("json:", json);
    // { type: <>, payload: <> }
    
    dispatch(json)
  }

  const initialize = () => {
    polling(endPoints.poll, pollingCallback)
  }

  useEffect(initialize, [])



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


  const joinGameInProgress = () => {
    fetch(endPoints.join)
    .then(response => response.json())
    .then(json => dispatch(json))
    .catch(error => {
      console.log("error:", error)
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
  // eslint-disable-next-line
  useEffect(() => claimBingo(), [state.winner])


  const announceDraw = () => {
    if (state.latest && state.playing) {
      say(state.latest)
    }
  }
  useEffect(announceDraw, [state.latest])


  
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


  const display = (() => {
    if (state.winner) {
      if (state.winner === -2) {
        return "This game has already started. You can play in the next game."

      } else if (state.winner < 0) {
        return "Bingo called in error"

      } else {
        return `The winner is ${state.winner}`
      }

    } else if (state.playing) {
      return state.latest
      
    } else {
      return ""
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