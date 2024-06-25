import { useCallback, useContext, useEffect, useState } from "react";
import "./MyOrders.scss";
import axiosInstance from "../../utils/axiosInstance";
import { StoreContext } from "../../context/StoreContext";
import { FaBowlFood } from "react-icons/fa6";

function MyOrders() {
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axiosInstance.post(
        "api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [token, fetchOrders]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, orderIndex) => (
          <div key={orderIndex} className="my-orders-order">
            <FaBowlFood className="food-icon" />
            <p>
              {order.items.map((item, itemIndex) => {
                if (itemIndex === order.items.length - 1)
                  return item.name + " x " + item.quantity;
                else return item.name + " x " + item.quantity + ", ";
              })}
            </p>
            <p>${order.amount} .00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
