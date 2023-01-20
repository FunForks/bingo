/**
 * Splash.jsx
 * 
 * lds-ring Source:  https://codepen.io/DariaIvK/details/EpjPRM
 */




export const Splash = ({ error }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>Bingo!</h1>
      { error
        ? <p>{error}</p>
        : <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
      }
      
    </div>
  )
}