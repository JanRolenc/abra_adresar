import './abraProdej.scss'
import React, { useEffect, useState } from 'react'
import FirmsListView from './components/FirmsList/FirmsListView'
import HeaderView from './components/Header/HeaderView'
import GroupsView from './components/Groups/GroupsView'
import { useSelector, useDispatch } from "react-redux";



export default function AbraProdej() {
  const dispatch = useDispatch();
  // const firmsState = useSelector((state) => state.firms.firmsListModel || [])
  const firmsState = useSelector((state) => state.firmsListModel.firms || [])
  const kohortsState = useSelector((state) => state.firmsListModel.kohorts || [])
  const [loadFirmsToggler, setLoadFirmToggler] = useState(false)

  // const firmsState = firms.winstrom.adresar
  // console.log("firmsState v prodej", firmsState)
  // let polePSCPSC = firmsState.winstrom.adresar.filter((firm) => firm.psc !== "").map(item => item.psc)
  // let polePSCPSC = firmsState.filter((firm) => firm.psc !== "").map(item => item.psc)
  // let upravenaPSC = polePSCPSC.map((item) => item.split(" ").join(""))
  // let sortedPSC = upravenaPSC.sort()

  // let numberOfKohorts = 4;
  // let numberOfFirms = sortedPSC.length;
  // let numberOfPSCinKohort = Math.ceil(numberOfFirms / numberOfKohorts);

  // function makeKohorts(arrayPSC, kohortyKolik) {
  //   var kohorty = []
  //   var polePSC = arrayPSC
  //   var num = 0;
  //   for (var i = 1; i <= kohortyKolik; i++) {
  //     let valueArray = [];
  //     for (var y = 0; y < numberOfPSCinKohort; y++) {
  //       valueArray.push(polePSC[num + y])
  //     }
  //     kohorty = [...kohorty, { ['kohorta_' + i]: valueArray }];
  //     console.log("kohorty", kohorty)
  //     num += 4;
  //   }
  //   setKohorts(kohorty)
  //   console.log("kohorts po spusteni fce makeKohorts", kohorts)
  // }


  // useEffect(() => {
  // dispatch.firmsListModel.loadFirms()
  // console.log('firmsState v useEffectu', firmsState)
  // }, [])


  const loadList = () => {
    dispatch.firmsListModel.setInitialState()
    setLoadFirmToggler(true)
  }

  const filterFirms = (e) => {
    dispatch.firmsListModel.filter(e.target.id)
  }

  const reloadList = () => {
    dispatch.firmsListModel.setInitialState()
  }

  return (
    <div className="abra-prodej-app">
      <HeaderView />
      <div className="abra-prodej-app__container">
        <FirmsListView firmsState={firmsState} loadFirmsToggler={loadFirmsToggler} />
        <GroupsView
          filterFirms={filterFirms}
          reloadList={reloadList}
          loadList={loadList}
          kohorts={kohortsState}
          loadFirmsToggler={loadFirmsToggler}
        />
      </div>
    </div>
  )
}
