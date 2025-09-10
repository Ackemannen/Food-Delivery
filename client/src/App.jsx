import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import MakeOrder from "./pages/MakeOrder";
import Footer from "./components/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="min-h-screen">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<MakeOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
