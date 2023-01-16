/**
 * Card.jsx
 */

export const Card = ({ card, drawn }) => {
  const rows = card.map(( row, index ) => {
    const cells = row.map(item => {
      const className = !item || drawn.indexOf(item) >= 0
                      ? "match"
                      : 0

      return (
        <td
          key={item}
          className={className}
        >
          {item || "FREE"}
        </td>
      )
    })

    return (
      <tr
        key={index}
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