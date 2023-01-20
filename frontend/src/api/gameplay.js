/**
 * gameplay.js
 */



const randomName = (() => {
  const names = [
    "Ada",
    "Ruby",
    "Lisa",
    "Jade",
    "Hal",
    "Pascal",
    "Jason"
  ]
  const randomIndex = Math.floor(Math.random() * names.length)

  return names[randomIndex]
})()


export const initialState = {
  player: randomName,
  card: [],
  unmatched: [],
  drawn: [],
  latest: "",
  url: "",
  playing: false,
  inProgress: false,
  winner: ""
}


const setPlayerName = ( state, action ) => {
  state.player = action.payload
  return { ...state }
}


const newGame = ( state, action ) => {
  const player = state.player
  const card = action.payload
  const unmatched = card.map( row => (
    row.map( item => !!item.name ) // 0 is matched
  ))
  const drawn = []
  const playing = true
  const inProgress = true

  return {
    ...initialState,
    player,
    card,
    unmatched,
    drawn,
    playing,
    inProgress
  }
}


const joinGame = ( state, { payload } ) => {  
  const player = state.player
  const { card, drawn } = payload

  // Match all items that have already been drawn
  const unmatched = card.map( row => (
    row.map( item => !!item.name )
  ))
  drawn.forEach( latest => {
    addMatch(card, unmatched, latest)
  })

  const playing = true
  const winner = -2 // disables Bingo! button: shows explanation

  return {
    ...initialState,
    player,
    card,
    unmatched,
    drawn,
    playing,
    winner
  }
}


const addMatch = (card, unmatched, latest) => {
  let cellIndex
  const rowIndex  = card.findIndex( row => {
    cellIndex = row.findIndex( item => item.name === latest)
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
  const drawn = action.payload
  state.latest = drawn
  let { unmatched } = state 

  if (state.winner < 0) {
    // The player falsely claimed Bingo. Play the game
    // automatically, ignoring user input.
    unmatched = addMatch(state.card, unmatched, drawn)
  }
  
  if (state.drawn.indexOf(drawn) < 0) {
    state.drawn.push(drawn)
  }

  const inProgress = true

  return { ...state, unmatched, inProgress }
}


const setMatch = ( state, action ) => {
  if (state.winner < 0) {
    return state
  }

  const { row, column } = action.payload
  const { unmatched } = state
  unmatched[row][column] = false

  return { ...state, unmatched } //, winner }
}


const callBingo = ( state, action ) => {
  const winner = checkForBingo(state.unmatched) || -1
  return { ...state, winner }
}


const gameOver = ( state, action ) => {
  state.playing = false
  state.inProgress = false
  state.winner = action.payload
  return { ...state }
}


export const reducer = ( state, action ) => {
  switch ( action.type) {
    case "SET_PLAYER_NAME":
      return setPlayerName(state, action)

    case "GAME_STARTED":
      return newGame(state, action)

    case "JOIN_GAME":
      return joinGame(state, action)

    case "DRAW":
      return cardDrawn(state, action)

    case "SET_MATCH":
      return setMatch(state, action)

    case "CALL_BINGO":
      return callBingo(state, action)
      
    case "GAME_OVER":
      return gameOver(state, action)

    default:
      return { ...state }
  }
}


// module.exports = {
//   initialState,
//   reducer
// }