import { useState, useEffect, useReducer } from 'react'
import { initialState, reducer } from './api/gameplay'

import { Card } from './components/Card'


const PORT = process.env.REACT_APP_BACKEND_PORT
const backend = window.location.origin.replace(/:\d+$/,`:${PORT}`)
const endPoints = {
  card: `${backend}/data/card`
}

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  const getCard = async() => {
    const newCard = json => {
      dispatch({
        type: "NEW_CARD",
        payload: json
      })
    }

    const response = await fetch(endPoints.card)
    response.json()
            .then(newCard)
  }

  useEffect(() => getCard(), [])

  return (
    <Card
      card={state.card}
    />
  );
}

export default App;
