/**
 * PlayerName.jsx
 */

export const PlayerName = (props) => {
  const {
    player,
    setPlayerName
  } = props

  return (
    <label
      htmlFor="playerName"
    >
      <span>Name:</span>
      <input
        type="text"
        name="playerName"
        id="playerName"
        value={player}
        placeholder=""
        onChange={setPlayerName}
      />
    </label>
  )
}