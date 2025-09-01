import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { MinusIcon, XIcon } from "lucide-react";

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

  return (
    <div className="px-4 md:px-16 lg:px-32">
      <div className="mt-24 text-gray-700">
        <div className="grid grid-cols-6 gap-4 items-center mb-4 pb-2 border-b-gray-300 border-b-1">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 justify-center items-center shadow-md rounded-lg mb-4 text-black font-semibold"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                {
                  /* Remove from cart or reduce button */
                  cartItems[item._id] > 1 ? (
                    <MinusIcon
                      onClick={() => removeFromCart(item._id)}
                      className="cursor-pointer text-red-600 hover:text-red-400"
                    />
                  ) : (
                    <XIcon
                      onClick={() => removeFromCart(item._id)}
                      className="cursor-pointer text-red-600 hover:text-red-400"
                    />
                  )
                }
              </div>
            );
          }
        })}
      </div>
      <div className="mt-20 flex justify-between flex-col sm:flex-row gap-6 lg:gap-30">
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="text-3xl font-bold">Cart Totals</h2>
          <div className="text-gray-700 font-semibold flex border-b border-gray-500 pb-4 flex-col gap-2">
            <div className="flex justify-between border-b border-gray-300">
              <p>Subtotal</p>
              <p>
                $
                {Object.keys(cartItems).reduce((total, id) => {
                  const item = food_list.find((item) => item._id === id);
                  return total + item.price * cartItems[id];
                }, 0)}
              </p>
            </div>
            <div className="flex justify-between border-b border-gray-400">
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
          <button className="bg-red-600 text-white font-semibold p-3 rounded-lg hover:bg-red-500 cursor-pointer mt-4 w-1/2 lg:w-1/4">
            Checkout
          </button>
        </div>
        <div className="flex-1 text-gray-700 flex items-center">
          <div className="w-full">
            <p>If you have a promo code, Enter it here:</p>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Promo code"
                className="bg-gray-200 p-2 rounded w-1/2 lg:w-1/3 outline-0"
              />
              <button className="bg-black text-white py-2 px-2 md:px-8 rounded hover:bg-gray-700 cursor-pointer ml-2">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
