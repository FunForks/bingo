/**
 * gameplay.js
 */


const initialState = {
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
  state.unmatched = action.payload.map( row => (
    row.map( item => !!item )
  ))
  state.drawn = []
  state.latest = ""
  state.playing = true
  state.inProgress = true
  return { ...state }
}


const addMatch = (card, unmatched, latest) => {
  let cellIndex
  const rowIndex  = card.findIndex( row => {
    cellIndex = row.findIndex( item => item === latest)
    return cellIndex >= 0
  })

  if (rowIndex >= 0) {
    unmatched[rowIndex][cellIndex] = false
  }

  return [...unmatched]
}


const checkForBingo = (unmatched) => {
  // Check if any row is all zeros
  let winner = !unmatched.every( row => (
    Math.max.apply(null, row)
  ))

  // Check if any column is all zeros
  if (!winner) {
    const columnSums = unmatched.reduce(( cumul, row ) => {
      row.forEach(( cell, index ) => (cumul[index] += cell))
      return cumul
    }, [0, 0, 0, 0, 0])

    winner = !Math.min.apply(null, columnSums)
  }

  if (!winner) {
    const diagonalSums = unmatched.reduce(( cumul, row, index ) => {
      cumul[0] += row[index]
      cumul[1] += row[4 - index]
      return cumul
    }, [0, 0])

    winner = !Math.min.apply(null, diagonalSums)
  }


  return winner
}


const cardDrawn = ( state, action ) => {
  state.latest = action.payload
  state.drawn.push(state.latest)
  const unmatched = addMatch(state.card, state.unmatched, state.latest)
  const winner = checkForBingo(unmatched)

  return { ...state, unmatched, winner }
}


const gameOver = ( state, action ) => {
  state.playing = false
  state.inProgress = false
  return { ...state }
}



const reducer = ( state, action ) => {
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


module.exports = {
  initialState,
  reducer
}