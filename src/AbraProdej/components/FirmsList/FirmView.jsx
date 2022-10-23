
const FirmView = ({ firm }) => {
  return (
    <tr
      className="abra-prodej-app__container__firms__list-container__item"
      key={firm.id}
    >
      <td>
        <span>{firm.kod}</span>
      </td>
      <td className="item-alignment-left">
        {firm.nazev}
      </td>
      <td>
        <span>{firm.psc.split(" ").join("")}</span>
      </td>
    </tr>
  )
}

export default FirmView
