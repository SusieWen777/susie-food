import { useContext } from "react";
import "./Cart.scss";
import { StoreContext } from "../../context/StoreContext";
import { IoTrashOutline } from "react-icons/io5";
import CartTotal from "../../components/CartTotal/CartTotal";
import { baseURL } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (!getTotalCartAmount()) return;
    navigate("/order");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${baseURL}/api/food/image/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <IoTrashOutline
                    className="remove-icon"
                    onClick={() => removeFromCart(item._id)}
                  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <CartTotal
          handleOnClick={handleOnClick}
          btnText="Proceed to checkout"
          navToOrder={true}
        />
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here.</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
