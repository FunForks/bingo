/**
 * Card.jsx
 */

export const Card = ({ card, drawn, unmatched, setMatch }) => {
  const checkForMatch = ( item, row, column ) => {
    const match = drawn.indexOf(item) >= 0
    if (match) {
      setMatch(row, column)
    }
  }

  const rows = card.map(( rowArray, row ) => {
    const cells = rowArray.map(( item, column ) => {
      const className = unmatched[row][column]
                      ? ""
                      : "match"

      return (
        <td
          key={item}
          className={className}
          onClick={() => checkForMatch( item, row, column )}
        >
          {item || "FREE"}
        </td>
      )
    })

    return (
      <tr
        key={row}
      >
        {cells}
      </tr>
    )
  })

  return (
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}