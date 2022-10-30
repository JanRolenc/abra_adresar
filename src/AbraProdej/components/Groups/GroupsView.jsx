
const GroupsView = ({ filterFirms, reloadList, loadList, kohorts, loadFirmsToggler }) => {
  if (kohorts.length > 0) {
    var cislicePSC = 5
    var xString = function createXstring(num) {
      let str = "";
      for (let i = 0; i < num; i++) {
        str += ' x';
      }
      return str
    }
    var pocetZobrazenychCislic = []
    pocetZobrazenychCislic[0] = 1;
    for (var i = 0; i < kohorts.length - 1; i++) {
      console.log('kohorts.length', kohorts.length)
      pocetZobrazenychCislic[i + 1] = 1;
      for (var y = 0; y < cislicePSC - 1; y++) {
        if ((Object.values(kohorts[i + 1])[0][0].substring(0, y + 1))
          === (Object.values(kohorts[i])[0][0].substring(0, y + 1))) {
          pocetZobrazenychCislic[i + 1] += 1
          if (pocetZobrazenychCislic[i + 1] > pocetZobrazenychCislic[i]) {
            pocetZobrazenychCislic[i] += 1
          }
        }
      }
    }
    console.log('pocetZobrazenychCislic', pocetZobrazenychCislic)
  }
  return (
    <div className="abra-prodej-app__container__functions">
      {!loadFirmsToggler &&
        <button onClick={loadList}>NAČTI DATA</button>}
      {kohorts.length > 0 ?
        <div className="abra-prodej-app__container__functions__kohorts">
          <h3>Třídění dle PSČ</h3>
          <div className="abra-prodej-app__container__functions__kohorts__container">

            {kohorts.map((koh, index) => (
              <p key={index} onClick={(e) => filterFirms(e)} id={Object.keys(koh)}>
                {Object.keys(koh)}:&nbsp;&nbsp;
                {
                  `${Object.values(koh)[0].toString().substring(0, pocetZobrazenychCislic[index])
                  + xString(cislicePSC - pocetZobrazenychCislic[index])}`
                }
              </p>
            ))}
            <button onClick={reloadList}>RELOAD</button>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default GroupsView

// {
//                 `${Object.values(koh)[0].toString()
//                 .substring(0, (index === 0)
//                   ?
//                   pocetZobrazenychCislicPrvni + retezecXprvni
//                   : pocetZobrazenychCislicOstatni + retezecXostatni)}`
//               }
// {Object.keys(koh)}

