import { useState, useEffect, useRef } from 'react'

import { Splash } from './components/Splash'
import { Game } from './components/Game'

import { poke } from './api/poke.js'
import { preloadImages } from './api/preloadImages.js'

const SPLASH_DELAY = 1000

let preloadComplete = false



const backend = process.env.REACT_APP_BACKEND

const endPoints = {
  poke:  `${backend}/poke`,
  poll:  `${backend}/poll`,
  start: `${backend}/start`,
  join:  `${backend}/join`,
  bingo: `${backend}/bingo`
}


const App = () => {
  const [ error, setError ] = useState(false)
  const [ inProgress, setInProgress ] = useState(false)
  const [ showSplash, setShowSplash ] = useState(true)

  const timeOutRef = useRef()


  const pokeBack = status => {
    if (!status) {
      return setError(true) // The app will now hang
    }

    setInProgress(status.inProgress)
    preloadImages(status.images, preloaded)
  }


  const preloaded = error => {
    preloadComplete = true // but if error, 1+ images failed
    if (!timeOutRef.current) {     
      setShowSplash(false)
    }
  }


  const hideSplash = () => {
    timeOutRef.current = 0

    if (preloadComplete) {
      setShowSplash(false)
    }
  }


  const initialize = () => {
    poke(endPoints.poke, pokeBack)
    timeOutRef.current = setTimeout(hideSplash, SPLASH_DELAY)
  }


  useEffect(initialize, [])


  if (showSplash) {
    return <Splash
      error={error && "No response from server"}
    />
  }


  return (
    <Game
      endPoints={endPoints}
      inProgress={inProgress}
    />
  );
}

export default App;
