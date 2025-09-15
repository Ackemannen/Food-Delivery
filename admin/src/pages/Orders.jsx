import axios from "axios";
import { PackageIcon, PhoneIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Could not fetch orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleStatusChange = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value,
      });
      if (response.data.success) {
        toast.success("Order status updated");
        getOrders();
      } else {
        toast.error("Could not update order status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-6 text-gray-700 w-full">
      <h3 className="text-2xl sm:text-4xl font-semibold mb-10">Order Page</h3>
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex gap-4 items-center border rounded-lg p-4"
          >
            <PackageIcon className="hidden sm:block size-8 md:size-10 text-red-600" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 w-full items-center">
              <p className="font-semibold">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="font-semibold">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div>
                <p>{order.address.address}</p>
                <p>{`${order.address.city}, ${order.address.postalCode}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="hidden md:block" />
                <p>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>
                Total: <strong>${order.total}</strong>
              </p>
              <select
                name="status"
                className="border p-2 rounded !text-sm sm:!text-base"
                onChange={(e) => handleStatusChange(e, order._id)}
                value={order.status}
              >
                <option value="Pending">Pending</option>
                <option value="Delivering">Delivering</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
