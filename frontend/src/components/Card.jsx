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

      const { name, url } = item
      const style = url ? {
                            backgroundImage: `url(${url})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                          }
                        : {}

      return (
        <td
          key={name}
          className={className}
          onClick={() => checkForMatch( name, row, column )}
          style={style}
        >
          <span>{name || "FREE"}</span>
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