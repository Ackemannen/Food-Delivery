import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const MakeOrder = () => {
  const { cartItems, foodList, token, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      total:
        Object.keys(cartItems).reduce((total, id) => {
          const item = foodList.find((item) => item._id === id);
          return total + item.price * cartItems[id];
        }, 0) + 5,
    };
    let response = await axios.post(`${url}/api/order/placeorder`, orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Order placement failed. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (Object.keys(cartItems).length === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div className="px-4 md:px-16 lg:px-32 mt-24 md:mt-32">
      <form
        onSubmit={placeOrder}
        className="flex flex-col sm:flex-row items-start justify-between"
      >
        <div className="flex flex-col gap-4 md:gap-8 w-full sm:w-1/2 mb-10">
          <h1 className="text-2xl font-bold">Delivery Information</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              required
              name="firstName"
              type="text"
              placeholder="First name"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            <input
              required
              name="lastName"
              type="text"
              placeholder="Last name"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>
          <input
            required
            name="email"
            type="text"
            placeholder="your@email.com"
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
          <input
            required
            name="address"
            type="text"
            placeholder="Street Address"
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              required
              name="city"
              type="text"
              placeholder="City"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
            <input
              required
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              className="border border-gray-300 p-2 rounded-md"
              onChange={handleChange}
            />
          </div>
          <input
            required
            name="phone"
            type="text"
            placeholder="Phone"
            className="border border-gray-300 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-1/4">
          <div className="text-gray-700 font-semibold flex flex-col gap-2">
            <h1 className="text-2xl text-black font-bold">Cart Totals</h1>
            <div className="flex justify-between border-b pb-2 border-gray-300">
              <p>Subtotal</p>
              <p>
                $
                {Object.keys(cartItems).reduce((total, id) => {
                  const item = foodList.find((item) => item._id === id);
                  return total + item.price * cartItems[id];
                }, 0)}
              </p>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-400">
              <p>Delivery Fee</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>
                $
                {(
                  Object.keys(cartItems).reduce((total, id) => {
                    const item = foodList.find((item) => item._id === id);
                    return total + item.price * cartItems[id];
                  }, 0) + 5
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="bg-red-600 text-white font-semibold p-3 rounded-lg hover:bg-red-500 cursor-pointer mt-6"
            onClick={() => Navigate("/order")}
            type="submit"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeOrder;
