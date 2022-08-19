import './InetProdej.scss'
import { IItem } from './interfaces'
import PersonView from './Person/PersonView'
import CartView from './Cart/CartView'
import ShopView from './Shop/ShopView'
import HeaderView from './Header/HeaderView'
import ModalView from './Modal/ModalView'
import SalesListView from './SalesList/SalesListView'
import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState, Dispatch } from './store'

export function numberCzechFormat(price: number) {
  var array = Array.from(price.toString())
  const index = array.findIndex((element) => element === '.')
  if (index > 0) {
    array.splice(index, 1, ',')
    if (index > 3) {
      for (let i = index - 3; i > 0; i -= 3) {
        array.splice(i, 0, ' ')
      }
    }
  } else if (array.length > 3) {
    for (let i = array.length - 3; i > 0; i -= 3) {
      array.splice(i, 0, ' ')
    }
  }

  return array.join('')
}

export default function InetProdej() {
  const dispatch = useDispatch<Dispatch>()
  const headerState = useSelector((state: RootState) => state.HeaderModel)
  const shopState = useSelector((state: RootState) => state.ShopModel)
  const personState = useSelector((state: RootState) => state.PersonModel)
  const cartState = useSelector((state: RootState) => state.CartModel)
  const modalState = useSelector((state: RootState) => state.ModalModel)
  const salesListState = useSelector((state: RootState) => state.SalesListModel)

  useEffect(() => {
    dispatch.ShopModel.loadItems(headerState.shopId)
    dispatch.HeaderModel.loadHeaderState(headerState.shopId)
  }, [])

  const shopItemClick = (item: IItem) => {
    if (item.quantity === 0 && item.type === 'standard') {
      alert('Zboží není skladem')
    } else {
      dispatch.CartModel.increment(item, 1)
      dispatch.ShopModel.decrement(item, 1)
    }
  }
  const removeItem = (itemToRemove: IItem) => {
    dispatch.ShopModel.addRemoved(itemToRemove)
    dispatch.CartModel.remove(itemToRemove)
  }
  const increaseItem = (itemToIncrease: IItem, count: number) => {
    const itemsCount: number =
      shopState.find((i) => i.id === itemToIncrease.id)?.quantity || 0
    if (itemsCount > 0) {
      const resultCount: number = Math.min(itemsCount, count)
      if (resultCount > 0 && itemToIncrease.type === 'standard') {
        dispatch.CartModel.increment(itemToIncrease, resultCount)
        dispatch.ShopModel.decrement(itemToIncrease, resultCount)
      } else if (resultCount <= 0 || itemsCount < count) {
        dispatch.CartModel.increment(itemToIncrease, itemsCount)
        dispatch.ShopModel.decrement(itemToIncrease, itemsCount)
      }
    } else {
      dispatch.CartModel.increment(itemToIncrease, count)
      dispatch.ShopModel.decrement(itemToIncrease, count)
    }
  }
  const decreaseItem = (itemToDecrease: IItem) => {
    dispatch.CartModel.decrement(itemToDecrease)
    dispatch.ShopModel.increment(itemToDecrease)
  }
  const touchScreenToggler = () => {
    dispatch.HeaderModel.toggleTouched()
  }
  const scannerToggler = (scanner: string) => {
    dispatch.HeaderModel.changeScanner(scanner)
  }
  const modalViewToggler = () => {
    dispatch.ModalModel.toggle()
  }
  const clearSalesList = () => {
    dispatch.SalesListModel.clearSalesList()
    console.log('salesListState po clear', salesListState)
  }
  var totalPrice = 0
  for (let j = 0; j < cartState.length; j++) {
    if (cartState[j].price > 0) {
      totalPrice += cartState[j].price * cartState[j].quantity
    }
  }
  const clearCart = () => {
    dispatch.CartModel.clearAll()
  }
  const clearPerson = () => {
    dispatch.PersonModel.setPerson(null)
  }
  const clearPersonInput = () => {
    dispatch.PersonModel.setPersonInput('')
  }

  return !headerState.shopId ? (
    <div>Neni vybrán obchod</div>
  ) : (
    <div
      className={`${
        headerState.touched === 'true'
          ? 'inet-prodej-app inet-prodej-app--touch'
          : 'inet-prodej-app'
      }`}
    >
      <HeaderView
        touchTogglerState={headerState.touched}
        touchScreenToggler={touchScreenToggler}
        headerState={headerState}
        scannerToggler={scannerToggler}
      />
      <ShopView
        shopState={shopState}
        shopItemClick={shopItemClick}
        headerState={headerState}
      />
      <div className="person-cart-container">
        <PersonView personState={personState} modalState={modalState} />
        <CartView
          cartState={cartState}
          removeItem={removeItem}
          decreaseItem={decreaseItem}
          increaseItem={increaseItem}
          totalPrice={totalPrice}
          personState={personState}
          modalViewToggler={modalViewToggler}
          modalState={modalState}
          salesListState={salesListState}
        />
      </div>
      {modalState && (
        <ModalView
          cartState={cartState}
          personState={personState}
          totalPrice={totalPrice}
          modalViewToggler={modalViewToggler}
          modalState={modalState}
          clearCart={clearCart}
          clearPerson={clearPerson}
          clearPersonInput={clearPersonInput}
        />
      )}
      {salesListState.open && (
        <SalesListView
          salesListState={salesListState}
          clearSalesList={clearSalesList}
        />
      )}
    </div>
  )
}
