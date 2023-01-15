/**
 * gameplay.js
 */


export const initialState = {
  card: [],
  drawn: [],
  latest: "",
  playing: false,
  inProgress: false
}



const createNewCard = ( state, action ) => {
  state.card = action.payload
  return { ...state }
}


const newGame = ( state, action ) => {
  state.card = action.payload
  state.drawn = []
  state.latest = ""
  state.playing = true
  state.inProgress = true
  return { ...state }
}


const cardDrawn = ( state, action ) => {
  state.latest = action.payload
  state.drawn.push(state.latest)
  return { ...state }
}


const gameOver = ( state, action ) => {
  state.playing = false
  state.inProgress = false
  return { ...state }
}



export const reducer = ( state, action ) => {
  console.log("action:", action);
  
  switch ( action.type) {
    case "NEW_CARD":
      return createNewCard(state, action)

    case "GAME_STARTED":
      return newGame(state, action)

    case "DRAW":
      return cardDrawn(state, action)

    case "GAME_OVER":
      return gameOver(state, action)

    default:
      return { ...state }
  }
}