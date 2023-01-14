/**
 * gameplay.js
 */


export const initialState = {
  card: []
}



const createNewCard = ( state, action ) => {
  state.card = action.payload
  return { ...state }
}



export const reducer = ( state, action ) => {
  switch ( action.type) {
    case "NEW_CARD":
      return createNewCard(state, action)

    default:
      return { ...state }
  }
}