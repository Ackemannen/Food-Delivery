import { XIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  useLockBodyScroll();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;

    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.status === 200) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      if (currentState === "Login") {
        toast.success("Logged in successfully");
      } else {
        toast.success("Registered successfully");
      }
    } else {
      toast.error(response.data.message);
      console.log(response.data.message);
    }
  };

  return (
    <div
      className="fixed z-100 w-full h-full bg-[rgba(0,0,0,0.5)] grid overscroll-contain"
      onClick={() => setShowLogin(false)}
    >
      <form
        className="place-self-center w-3/4 md:w-1/3 bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6 text-gray-600"
        onClick={(e) => e.stopPropagation()}
        onSubmit={onLogin}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{currentState}</h2>
          <XIcon
            onClick={() => setShowLogin(false)}
            className="cursor-pointer text-red-600 hover:text-red-400"
          />
        </div>
        <div className="flex flex-col gap-4">
          {currentState === "Sign Up" && (
            <input
              name="name"
              type="text"
              required
              placeholder="Your Name"
              className="border border-gray-300 p-3 rounded-lg outline-1 focus:outline-red-600"
              onChange={handleChange}
              value={data.name}
            />
          )}
          <input
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            className="border border-gray-300 p-3 rounded-lg outline-1 focus:outline-red-600"
            onChange={handleChange}
            value={data.email}
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg outline-1 focus:outline-red-600"
            onChange={handleChange}
            value={data.password}
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-500 cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            required
            className="accent-red-600 cursor-pointer"
          />
          <p className="text-gray-500">
            By signing up you agree to our terms and conditions.
          </p>
        </div>
        <p
          className="text-center text-red-600 font-semibold cursor-pointer hover:text-red-400"
          onClick={() =>
            setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up")
          }
        >
          {currentState === "Sign Up"
            ? "Already have an account?"
            : "Create an account"}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
