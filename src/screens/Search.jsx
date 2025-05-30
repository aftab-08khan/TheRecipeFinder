import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiClock, FiX } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const outletRef = useRef(null); // Create a ref for the Outlet

  const [countries, setCountries] = useState(null);
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const fetchAllArea = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
      );

      const data = await res.json();
      setCountries(data?.meals);
    } catch (error) {
      console.log(error, "Error");
    }
  };
  useEffect(() => {
    fetchAllArea();
  }, []);

  const fetchByArea = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchQuery}`
      );
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (data?.meals || data?.meals === null) {
      navigate(`${searchQuery}`, {
        state: data?.meals || null,
      });
    }
    const updatedRecentSearches = [
      searchQuery,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== searchQuery.toLowerCase()
      ),
    ].slice(0, 5);

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );

    setSearchQuery("");
    setShowRecent(false);
    // Scroll to the Outlet after search
    if (outletRef.current) {
      outletRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    setShowRecent(false);
  };
  useEffect(() => {
    fetchByArea();
  }, [searchQuery]);
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <CustomButton path={"/"}>Back</CustomButton>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Find Your Perfect Recipe
      </h1>

      <form onSubmit={handleSearch} className="relative mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            placeholder="Search for Region or area....."
            className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {showRecent && recentSearches.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-2">
              <div className="flex items-center px-3 py-2 text-gray-500">
                <FiClock className="mr-2" />
                <span className="text-sm font-medium">Recent searches</span>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  onClick={() => handleRecentSearchClick(search)}
                >
                  <FiSearch className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          Search Recipes
        </button>
      </form>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          How to search
        </h2>
        <ul className="flex flex-wrap gap-4 items-baseline space-y-2 text-gray-600">
          {countries === null
            ? [1, 2, 3, 4, 5, 6, , 7, 8, 1, 2, 3, 4, 5, 6, , 7, 8].map(
                (item, i) => (
                  <li
                    key={i}
                    className="h-8 w-20 bg-orange-300 text-orange-800 px-3 py-1 rounded-full shadow-lg animate-pulse"
                  ></li>
                )
              )
            : countries?.map((item, i) => {
                return (
                  <li
                    key={i}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-orange-300 hover:shadow-orange-200 transition-all duration-300 hover:shadow-lg"
                    onClick={() => setSearchQuery(item?.strArea)}
                  >
                    {item?.strArea}
                  </li>
                );
              })}
        </ul>
      </div>

      <div ref={outletRef}>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
