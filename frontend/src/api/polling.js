/**
 * polling.js
 * 
 * 
 */


export const polling = (endpoint, callback) => {  
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }

  const subscribe = () => {    
    fetch(endpoint, options)
    .then(response => response.json())
    .then(json => callback(json))
    .then(subscribe) // immediately start waiting for a new update
    .catch(error => {
      // Don't subscribe again if there is an error
      console.log("error:", error)
    })
  }

  subscribe()
}