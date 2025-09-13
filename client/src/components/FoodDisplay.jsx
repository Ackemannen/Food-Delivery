import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { url, foodList } = useContext(StoreContext);

  return (
    <div className="mt-10">
      <h2 className="text-2xl md:text-4xl font-bold">Food Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {foodList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={`${url}/images/${item.image}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
