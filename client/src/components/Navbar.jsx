import React, { useContext, useState } from "react";
import {
  LogOutIcon,
  Search,
  ShoppingBagIcon,
  ShoppingBasket,
  UserIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const { cartItems, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

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
            <div
              className={`absolute right-0 top-0 bg-red-600 rounded-full w-2.5 h-2.5 ${
                Object.keys(cartItems).length > 0 ? "block" : "hidden"
              }`}
            ></div>
          </div>
          {!token ? (
            <button
              className="bg-red-600 text-white text-base md:!text-lg font-semibold py-2 px-6 rounded-xl cursor-pointer hover:bg-red-500 transition duration-300"
              onClick={() => setShowLogin(true)}
            >
              Sign in
            </button>
          ) : (
            <div className="relative group">
              <UserIcon className="cursor-pointer size-6 md:size-7" />
              <ul className="absolute hidden right-0 z-1 group-hover:flex flex-col gap-2 bg-gray-100 shadow-lg p-4 rounded-2xl border border-red-400">
                <li className="flex items-center gap-2 cursor-pointer">
                  <Link to="/myorders" className="flex items-center gap-2">
                    <ShoppingBagIcon className="text-red-500 size-5" />
                    <p>Orders</p>
                  </Link>
                </li>
                <li
                  className="flex items-center gap-2 cursor-pointer border-t border-red-400 pt-2"
                  onClick={logout}
                >
                  <LogOutIcon className="text-red-500 size-5" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
