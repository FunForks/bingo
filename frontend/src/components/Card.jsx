/**
 * Card.jsx
 */

export const Card = ({ card }) => {
  const rows = card.map(( row, index ) => {
    const cells = row.map(item => {
      return (
        <td
          key={item}
        >
          {item}
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