import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import axios from "axios";

const FoodDisplay = ({ category }) => {
  const { url } = useContext(StoreContext);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data); // assuming API returns an array
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };

    fetchFood();
  }, [url]);

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
