import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { ShoppingBagIcon } from "lucide-react";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const getOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token: token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);

  return (
    <div className="my-10 px-4 md:px-16 lg:px-32">
      <h2 className="text-2xl md:text-4xl font-bold">My Orders</h2>
      <div className="flex flex-col gap-4 mt-6 text-gray-700">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center p-4 border border-red-400 rounded-lg"
            >
              <ShoppingBagIcon className="text-red-500 size-10" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.total}.00</p>
              <p>Items: {order.items.length}</p>
              <p className="flex items-center gap-1">
                <span className="text-red-500">&#x25cf;</span>
                <strong>{order.status}</strong>
              </p>
              <button className="py-2 px-4 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400 transition">
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
