import React from "react";
import homeImg from "../assets/img/homeImg.jpg";

const Header = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="absolute top-35 w-full h-[75vh] z-[-10] px-4 md:px-16 lg:px-32">
        <img
          src={homeImg}
          alt="plate of food"
          className="relative w-full h-full object-cover rounded-3xl brightness-90"
        />
      </div>

      <div className="flex flex-col items-center justify-center sm:items-start sm:justify-end gap-4 md:gap-8 relative text-white z-10 w-full h-[75vh] py-4 md:py-8 lg:py-16 px-6 md:px-16 lg:px-32 animate-[fadeIn_1s_ease-in-out]">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-2 w-2/3 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Order your favorite food here!
        </h2>
        <p className="text-lg md:text-xl font-semibold mb-4 w-2/3 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Choose from a wide variety of dishes and enjoy a delicious meal made
          with love. We make sure to deliver quality food right to your
          doorstep.
        </p>
        <button className="bg-red-600 text-white py-2 px-4 rounded-xl !text-lg hover:bg-red-700 transition duration-300 cursor-pointer">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
