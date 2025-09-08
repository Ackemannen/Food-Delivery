import { Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.status === 201) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      setImage(false);
      toast.success("Item added successfully");
    } else {
      toast.error("Something went wrong");
      console.log(response);
    }
  };

  return (
    <div className="w-[82%] p-4 md:p-8 lg:p-16 text-gray-700">
      <form className="flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl">Upload Image</p>
          <label htmlFor="image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="image"
                className="w-40 h-40 object-cover rounded-2xl"
              />
            ) : (
              <Upload className="w-10 h-10 md:w-16 md:h-16 p-2 md:p-4 rounded-full cursor-pointer bg-red-300" />
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            className="hidden"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-2xl">Product Name</p>
          <input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            id="name"
            placeholder="Chicken Biryani"
            className="p-2 border border-red-300 rounded-lg focus:outline-red-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-2xl">Product Description</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            name="description"
            id="description"
            rows="6"
            placeholder="Delicious chicken biryani with spices"
            required
            className="p-2 border border-red-300 rounded-lg focus:outline-red-500"
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="flex flex-col gap-2">
            <p className="text-2xl">Product Category</p>
            <select
              name="category"
              id="category"
              required
              className="p-2 border border-red-300 rounded-lg focus:outline-red-500"
              onChange={handleChange}
              value={data.category}
            >
              <option value="" disabled selected>
                Select Category
              </option>
              <option value="salad">Salad</option>
              <option value="rolls">Rolls</option>
              <option value="deserts">Deserts</option>
              <option value="sandwich">Sandwich</option>
              <option value="cake">Cake</option>
              <option value="pure veg">Pure Veg</option>
              <option value="pasta">Pasta</option>
              <option value="noodles">Noodles</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-2xl">Product Price</p>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="$16"
              required
              className="p-2 border border-red-300 rounded-lg focus:outline-red-500"
              onChange={handleChange}
              value={data.price}
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          type="submit"
          className="p-2 bg-red-600 rounded-lg !text-lg text-white font-semibold cursor-pointer hover:bg-red-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
