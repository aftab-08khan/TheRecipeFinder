import React from "react";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <div className="text-center text-white p-8">
      <h1 className="text-6xl mt-16 font-bold mb-2 text-[#ff6b6b]">
        Welcome to <span className="text-[#ffe66d]">Recipe Finder</span>
      </h1>
      <p className="text-2xl mt-6 text-[#f1f1f1]">
        Discover tasty meals to brighten your day!
      </p>
      <div className="flex gap-12 mt-6 justify-center">
        <a href="#">
          <button className="font-semibold px-4 py-3 rounded-xl bg-[#4caf50]">
            Today's Special
          </button>
        </a>
        <a href="#">
          <button className="font-semibold px-4 py-3 rounded-xl bg-[#7a7a7a]">
            Search a Recipe
          </button>
        </a>
      </div>
      <Categories />
    </div>
  );
};

export default Home;
