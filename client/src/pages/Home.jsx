import React, { useState } from "react";
import Header from "../components/Header";
import HomeMenu from "../components/HomeMenu";
import FoodDisplay from "../components/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="px-4 md:px-16 lg:px-32 ">
      <Header />
      <HomeMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
