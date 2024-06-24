import "./CartTotal.scss";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Delivery_Fee } from "../../utils/constants";

function CartTotal({ btnText, navToOrder, handleOnClick, btnMarginTop }) {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="cart-total">
      <h2>Cart Total</h2>
      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${getTotalCartAmount() === 0 ? "0" : Delivery_Fee}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>
            $
            {getTotalCartAmount() === 0
              ? "0"
              : getTotalCartAmount() + Delivery_Fee}
          </b>
        </div>
      </div>
      <button
        onClick={handleOnClick}
        style={{ marginTop: btnMarginTop ? btnMarginTop : 0 }}
        type={navToOrder ? "button" : "submit"}
      >
        {btnText}
      </button>
    </div>
  );
}

export default CartTotal;
