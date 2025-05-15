import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import "../App.css";
import CustomButton from "../components/CustomButton";
import SearchInput from "../components/SearchInput";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const [randomMealData, setRandomMealData] = useState(null);
  const fetchRandomMeal = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {}, []);
  const handleNavigation = async () => {
    const data = await fetchRandomMeal();

    navigate(`/recipe/${data?.meals[0]?.strMeal}`, {
      state: { data: data?.meals[0] },
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12 md:py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-amber-900 font-playfair">
            Welcome to{" "}
            <span className="text-amber-600 relative inline-block">
              Recipe Finder
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-amber-400 transform origin-left transition-all duration-500 scale-x-0 group-hover:scale-x-100"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl mt-6 text-amber-800 max-w-2xl mx-auto">
            Discover delicious meals that will tantalize your taste buds and
            brighten your day!
          </p>

          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            {/* <a href="#todays-special"> */}
            <div
              onClick={handleNavigation}
              className="font-semibold px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                  clipRule="evenodd"
                />
              </svg>
              Today's Special
            </div>
            {/* </a> */}
            {/* <CustomButton path={"/"}>Today's Special</CustomButton> */}
            <Link to={"/search"}>
              <button className="font-semibold px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-amber-800 border border-amber-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Search a Recipe
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-12 md:mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-8 font-playfair">
            Browse by Category
          </h2>
          <div className="container mx-auto px-4 py-8 flex flex-col justify-center">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
