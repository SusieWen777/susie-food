import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartTotal from "../../components/CartTotal/CartTotal";
import "./PlaceOrder.scss";
import { StoreContext } from "../../context/StoreContext";
import axiosInstance from "../../utils/axiosInstance";
import { Delivery_Fee } from "../../utils/constants";

let originData = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  phone: "",
};

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState(originData);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onPlaceOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + Delivery_Fee,
    };
    try {
      let response = await axiosInstance.post("/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={onPlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={data.email}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="city"
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            onChange={onChangeHandler}
            name="zipCode"
            value={data.zipCode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          name="phone"
          required
        />
      </div>
      <div className="place-order-right">
        <CartTotal
          btnText="Process to Payment"
          btnMarginTop={"30px"}
          navToOrder={false}
        />
      </div>
    </form>
  );
}

export default PlaceOrder;
