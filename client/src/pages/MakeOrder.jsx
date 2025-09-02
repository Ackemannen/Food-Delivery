import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const MakeOrder = () => {
  const { cartItems, food_list } = useContext(StoreContext);
  return (
    <div className="px-4 md:px-16 lg:px-32 mt-24 md:mt-32">
      <form className="flex flex-col sm:flex-row items-start justify-between">
        <div className="flex flex-col gap-4 md:gap-8 w-full sm:w-1/2 mb-10">
          <h1 className="text-2xl font-bold">Delivery Information</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="First name"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <input
            type="text"
            placeholder="your@email.com"
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Street Address"
            className="border border-gray-300 p-2 rounded-md"
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            className="border border-gray-300 p-2 rounded-md"
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
                  const item = food_list.find((item) => item._id === id);
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
                    const item = food_list.find((item) => item._id === id);
                    return total + item.price * cartItems[id];
                  }, 0) + 5
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="bg-red-600 text-white font-semibold p-3 rounded-lg hover:bg-red-500 cursor-pointer mt-6"
            onClick={() => Navigate("/order")}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeOrder;
