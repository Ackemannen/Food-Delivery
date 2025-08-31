import { MinusIcon, PlusIcon } from "lucide-react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  return (
    <div className="rounded-2xl shadow-md animate-[fadeIn_1s_ease-in-out]">
      <div className="relative">
        <img src={image} alt={name} className="w-full rounded-t-2xl" />
        {cartItems[id] ? (
          <div className="absolute bottom-2 right-2 flex items-center justify-end p-1 bg-white rounded-full shadow-2xl">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-300 cursor-pointer">
              <MinusIcon
                className="h-6 w-6 text-red-600"
                onClick={() => removeFromCart(id)}
              />
            </div>
            <span className="mx-2 font-semibold">{cartItems[id]}</span>
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-300 cursor-pointer">
              <PlusIcon
                className="h-6 w-6 text-green-600"
                onClick={() => addToCart(id)}
              />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-2 right-2 flex items-center justify-end p-1 ">
            <div
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white"
              onClick={() => addToCart(id)}
            >
              <PlusIcon className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-gray-700">{description}</p>
        <p className="text-xl text-red-600 font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
