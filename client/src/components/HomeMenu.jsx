import React from "react";
import { menu_list } from "../assets/assets";

const HomeMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col mb-10">
      <h1 className="text-2xl md:!text-5xl font-semibold mb-4">
        Explore Our Menu
      </h1>
      <p className="text-lg md:text-xl mb-4 w-3/4 md:w-1/2">
        Choose from a wide variety of dishes and enjoy a delicious meal made
        with love. We make sure to deliver quality food right to your doorstep.
      </p>
      <div className="flex justify-between gap-6 align-center text-center mt-4 mb-2 overflow-x-auto overflow-y-hidden p-2">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer flex-shrink-0"
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-32 h-32 rounded-full ${
                category === item.menu_name
                  ? "ring-4 md:ring-6 ring-red-600"
                  : ""
              }`}
            />
            <p className="mt-2 text-gray-600 text-lg">{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeMenu;
