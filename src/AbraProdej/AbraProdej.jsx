import './abraProdej.scss'
import React, { useEffect } from 'react'
import FirmsListView from './components/FirmsList/FirmsListView'
import HeaderView from './components/Header/HeaderView'
import GroupsView from './components/Groups/GroupsView'
import { useSelector, useDispatch } from "react-redux";



export default function AbraProdej() {
  const dispatch = useDispatch();

  const firmsState = useSelector((state) => state.firmsListModel)
  // const firmsState = firms.winstrom.adresar
  console.log("firmsState v prodej", firmsState)
  // let polePSC = firmsState.winstrom.adresar.filter((firm) => firm.psc !== "").map(item => item.psc)
  // let upravenaPSC = polePSC.map((item) => item.split(" ").join(""))
  // console.log('firmsState', firmsState)

  // useEffect(() => {
  //   dispatch.firmsListModel.loadFirms()
  //   // console.log('firmsState v useEffectu', firmsState)
  // }, [])


  const filterFirms = (number) => {
    dispatch.firmsListModel.filter(number)
  }

  const reloadList = () => {
    dispatch.firmsListModel.setInitialState()

  }

  return (

    <div className="abra-prodej-app">
      <HeaderView />
      <div className="abra-prodej-app__container">
        <FirmsListView firmsState={firmsState} />
        <GroupsView filterFirms={filterFirms} reloadList={reloadList} />
      </div>
    </div>
  )
}
