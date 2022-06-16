import CartItemView from "./CartItemView";
import { ICartView } from "../interfaces";

import { ReactComponent as CartIcon } from "../assets/shopping-cart.svg";

const CartView = ({
  cartState,
  removeItem,
  decreaseItem,
  increaseItem,
  totalPrice,
  toggleTouchState,
  priceCzechFormat,
}: ICartView) => {
  return (
    <div className="cart">
      <div className="cart__name">Košík</div>
      <div className="cart__list-container">
        <table>
          <thead>
            <tr>
              <th>Odebrat vše</th>
              <th>Druh zboží / služby</th>
              <th className="item-alignment-right">Cena / kus</th>
              <th className="item-alignment-right">Počet</th>
              <th className="item-alignment-right">Cena</th>
              <th className="item-alignment-right"></th>
            </tr>
          </thead>

          <tbody>
            {cartState.length
              ? cartState.map((item) => (
                  <CartItemView
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    decreaseItem={decreaseItem}
                    increaseItem={increaseItem}
                    toggleTouchState={toggleTouchState}
                    priceCzechFormat={priceCzechFormat}
                  />
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className="cart__sale">
        <div>
          <span style={{ display: "block" }}>
            Celková cena: {priceCzechFormat(totalPrice)} Kč
          </span>
          <span style={{ display: "block" }}>
            SUPO: Klientův zůstatek po zaplacení nákupního košíku: {}
          </span>
        </div>
        <button>
          <CartIcon /> Prodej
        </button>
      </div>
    </div>
  );
};

export default CartView;
