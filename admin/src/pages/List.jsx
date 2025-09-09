import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const getList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.status === 200) {
      setList(response.data.data);
    } else {
      console.log(response);
      toast.error("Could not fetch list");
    }
  };

  const removeItem = async (id) => {
    const response = await axios.delete(`${url}/api/food/remove`, {
      data: { id: id },
    });
    if (response.status === 200) {
      toast.success("Item removed successfully");
      getList();
    } else {
      console.log(response);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="text-gray-700 w-full p-6">
      <p className="text-2xl font-bold mb-6">All Foods List</p>
      <div className="flex flex-col">
        <div className="hidden sm:grid grid-cols-5 items-center border border-gray-400 p-2 sm:text-lg">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong>Action</strong>
        </div>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-3 sm:grid-cols-5 items-center border border-gray-400 border-t-0 p-2"
            >
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-12 h-12 md:w-20 md:h-20 object-cover rounded"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <X
                className="cursor-pointer text-red-600"
                onClick={() => removeItem(item._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
