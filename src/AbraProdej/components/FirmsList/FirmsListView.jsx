import React from "react";

import FirmView from './FirmView'

const FirmsListView = ({ firmsState }) => {

  return (
    <div className="abra-prodej-app__container__firms">
      <div className="abra-prodej-app__container__firms__list-container">
        <table>
          <thead>
            <tr>
              <th>Kód</th>
              <th className="item-alignment-left">Název firmy</th>
              <th>PSČ</th>
            </tr>
          </thead>
          <tbody>
            {/* {firmsState.winstrom.adresar.map((firm) => */}
            {firmsState.map((firm) =>
              firm.kod && firm.psc &&
              (
                <FirmView key={firm.id} firm={firm} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FirmsListView

