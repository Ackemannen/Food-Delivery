import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);

  const addToCart = async (id) => {
    if (!cartItems[id]) {
      setCartItems((prev) => ({ ...prev, [id]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId: id },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const removeFromCart = async (id) => {
    setCartItems((prev) => {
      if (prev[id] === 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [id]: prev[id] - 1 };
      }
    });
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId: id },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart: ", error);
      }
    }
  };

  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCart = async (token) => {
    const response = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } }
    );
    setCartItems(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await getFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCart(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getCartTotalAmount,
    url,
    token,
    setToken,
    foodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
