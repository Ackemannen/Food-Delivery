import React, { useState } from "react";
import { Search, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  return (
    <div>
      <nav className="bg-white shadow flex items-center justify-between py-2 px-6 md:px-16 lg:px-32">
        <Link to="/">
          <h1 className="text-2xl md:text-4xl font-bold text-red-600">
            Foodel
          </h1>
        </Link>
        <ul className="hidden md:flex space-x-4 md:space-x-6 lg:space-x-10 text-gray-600 font-semibold">
          <li
            className={`cursor-pointer ${
              menu === "Home" ? "text-red-600" : ""
            }`}
            onClick={() => setMenu("Home")}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={`cursor-pointer ${
              menu === "Menu" ? "text-red-600" : ""
            }`}
            onClick={() => setMenu("Menu")}
          >
            Menu
          </li>
          <li
            className={`cursor-pointer ${
              menu === "Contact" ? "text-red-600" : ""
            }`}
            onClick={() => setMenu("Contact")}
          >
            Contact
          </li>
        </ul>
        <div className="flex items-center relative gap-4 md:gap-8 lg:gap-10">
          <Search className="cursor-pointer size-6 md:size-7" />
          <div className="flex items-center relative">
            <Link to="/cart">
              <ShoppingBasket className="cursor-pointer size-6 md:size-7 mr-2" />
            </Link>
            <div className="absolute right-0 top-0 bg-red-600 rounded-full w-2.5 h-2.5"></div>
          </div>
          <button
            className="bg-white border border-red-600 text-gray-700 py-2 px-6 rounded-xl cursor-pointer hover:bg-red-100 hover:border-red-500 transition duration-300"
            onClick={() => setShowLogin(true)}
          >
            Sign in
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
