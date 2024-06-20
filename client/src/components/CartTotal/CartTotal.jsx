import "./CartTotal.scss";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const deliveryFee = 8;

function CartTotal({ btnText, navToOrder, btnMarginTop }) {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (!getTotalCartAmount()) return;
    if (navToOrder) {
      navigate("/order");
    } else {
      //   window.location.href = "https://external-website.com";
    }
  };

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
          <p>${getTotalCartAmount() === 0 ? "0" : deliveryFee}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>
            $
            {getTotalCartAmount() === 0
              ? "0"
              : getTotalCartAmount() + deliveryFee}
          </b>
        </div>
      </div>
      <button
        onClick={handleOnClick}
        style={{ marginTop: btnMarginTop ? btnMarginTop : 0 }}
      >
        {btnText}
      </button>
    </div>
  );
}

export default CartTotal;
