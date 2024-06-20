import { createContext, useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axiosInstance.get("api/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Make sure the fetchCartItems function is not recreated on every render
  const fetchCartItems = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axiosInstance.get("api/cart/", {
        headers: { token },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    fetchFoodList();
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axiosInstance.post(
          "api/cart/add",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const subtractFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axiosInstance.post(
          "api/cart/subtract",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      delete newCartItems[itemId];
      return newCartItems;
    });
    if (token) {
      try {
        await axiosInstance.post(
          "api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] === 0) continue;
      let itemInfo = food_list.find((food) => food._id === item);
      totalAmount += itemInfo.price * cartItems[item];
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    subtractFromCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
