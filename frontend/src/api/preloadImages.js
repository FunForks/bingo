// https://gist.github.com/gordonbrander/7874786f2b464eacb1d0911d4c4b5b5b


export const preloadImages = async (srcs, callback) => {
  try {
    await Promise.all(srcs.map(preload))

    callback() // no error

  } catch (error) {
    callback(error)
  }
}


const preload = src => new Promise((resolve, reject) => {
  const img = new Image()
  img.onload = resolve // resolve() receives onload event
  img.onerror = reject
  img.src = src
})