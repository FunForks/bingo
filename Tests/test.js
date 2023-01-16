const gameplay = require('../frontend/src/api/gameplay.js')
const { initialState, reducer } = gameplay


const checkRow = () => {
  let state = {...initialState}

  const unmatched = [
    [ 1, 1, 1, 1, 1 ],
    [ 0, 0, 1, 0, 0 ],
    [ 1, 1, 0, 1, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ]
  const card = [
    [ 1,  1,  1,  1,  1 ],
    ["a","b","d","c","e"],
    [ 1,  1,  0,  1,  1 ],
    [ 1,  1,  1,  1,  1 ],
    [ 1,  1,  1,  1,  1 ]
  ]

  state = { ...state, card, unmatched }

  const drawn = "d"

  const action = {
    type: "DRAW",
    payload: drawn
  }

  const result = reducer( state, action )
  // console.log("row winner", result.winner);

  expect(result.winner).toBe(true)
}


const checkColumn = () => {
  let state = {...initialState}

  const unmatched = [
    [ 1, 1, 0, 1, 1 ],
    [ 1, 0, 1, 0, 0 ],
    [ 1, 1, 0, 1, 1 ],
    [ 1, 1, 0, 1, 1 ],
    [ 1, 1, 0, 1, 1 ]
  ]
  const card = [
    [ 1, 1,"a",1, 1 ],
    [ 1, 1,"d",1, 1],
    [ 1, 1, 0, 1, 1 ],
    [ 1, 1,"b",1, 1 ],
    [ 1, 1,"c",1, 1 ]
  ]

  state = { ...state, card, unmatched }

  const drawn = "d"

  const action = {
    type: "DRAW",
    payload: drawn
  }

  const result = reducer( state, action )
  // console.log("column winner", result.winner);

  expect(result.winner).toBe(true)
}


const checkDiagonal = () => {
  let state = {...initialState}

  const unmatched = [
    [ 0, 1, 1, 1, 1 ],
    [ 1, 0, 1, 1, 1 ],
    [ 1, 1, 0, 1, 1 ],
    [ 1, 1, 1, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ]
  const card = [
    ["a",1, 1, 1, 1 ],
    [ 1,"b",1, 1, 1 ],
    [ 1, 1, 0, 1, 1 ],
    [ 1, 1, 1,"c",1 ],
    [ 1, 1, 1, 1,"d"]
  ]

  state = { ...state, card, unmatched }

  const drawn = "d"

  const action = {
    type: "DRAW",
    payload: drawn
  }

  const result = reducer( state, action )
  // console.log("diagonal winner", result.winner);

  expect(result.winner).toBe(true)
}


const checkOtherDiagonal = () => {
  let state = {...initialState}

  const unmatched = [
    [ 1, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 0, 1, 1 ],
    [ 1, 0, 1, 1, 1 ],
    [ 0, 1, 1, 1, 1 ]
  ]
  const card = [
    [ 1, 1, 1, 1,"c"],
    [ 1, 1, 1,"d",1 ],
    [ 1, 1, 0, 1, 1 ],
    [ 1,"b",1, 1, 1 ],
    ["a",1, 1, 1, 1 ]
  ]

  state = { ...state, card, unmatched }

  const drawn = "d"

  const action = {
    type: "DRAW",
    payload: drawn
  }

  const result = reducer( state, action )
  // console.log("other diagonal winner", result.winner);

  expect(result.winner).toBe(true)
}

// checkRow()
// checkColumn()
// checkDiagonal()
// checkOtherDiagonal()

test('check row', checkRow)
test('check column', checkColumn)
test('check diagonal', checkDiagonal)
test('check other diagonal', checkOtherDiagonal)