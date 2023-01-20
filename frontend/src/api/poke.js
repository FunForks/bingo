/**
 * poke.js
 * 
 * If the backend is hosted on a service which spins down after a
 * few minutes of inactivity, the first attempt to connect to the
 * backend will fail. It will simply restart the service. A second
 * or third connection attempt may be required.
 * 
 * The /poke endpoint will respond with an array of image urls
 * and a Boolean inProgress flag... or not at all.
 */


const TIMEOUT_DELAY = 500


export const poke = async(endpoint, callback) => {

  const controller = new AbortController();
  const signal = controller.signal;
  const regex = /(load failed)|((fail|error).*fetch)/i
  // Safari, Chrome, Opera, Firefox
  let attempts = 10
  let timeOut

  const pokeBackend = async () => {
    try {
      const abort = () => {
        controller.abort()
      }
      timeOut = setTimeout(abort, TIMEOUT_DELAY);

      const response = await fetch(endpoint, { signal })
      const status = await response.json()

      clearTimeout(timeOut)
      callback(status)

    } catch(error) {
      console.error(`Download error: ${error}`);

      clearTimeout(timeOut)

      if (attempts--) {
        const failedToFetch = regex.test(error.message)
        const delay = failedToFetch
                    ? TIMEOUT_DELAY // give backend some time
                    : 0 // earlier timeOut triggered abort
        setTimeout(pokeBackend, delay)

      } else {
        callback() // No data available from the backend
      }
    };
  }

  pokeBackend()
}