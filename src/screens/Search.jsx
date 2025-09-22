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
  const outletRef = useRef(null);

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

    if (outletRef.current) {
      outletRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const clearSearch = () => setSearchQuery("");

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    setShowRecent(false);
  };

  useEffect(() => {
    if (searchQuery) fetchByArea();
  }, [searchQuery]);

  return (
    <div className=" w-full px-32 py-10 bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Back Button */}
      <CustomButton path={"/"}>⬅ Back</CustomButton>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
        🍲 Find Your Perfect Recipe
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        Search by region/area and discover amazing recipes worldwide.
      </p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative mb-10">
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
            placeholder="Search for Region or Area..."
            className="block w-full pl-10 pr-12 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg text-gray-900 dark:text-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
            </button>
          )}
        </div>

        {/* Recent Searches Dropdown */}
        {showRecent && recentSearches.length > 0 && (
          <div className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
              <FiClock className="mr-2" />
              <span className="text-sm font-semibold">Recent Searches</span>
            </div>
            {recentSearches.map((search, index) => (
              <button
                key={index}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center transition-all"
                onClick={() => handleRecentSearchClick(search)}
              >
                <FiSearch className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-200">
                  {search}
                </span>
              </button>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-all"
        >
          🔍 Search Recipes
        </button>
      </form>

      {/* Search Guide & Countries */}
      <div className="bg-orange-50 dark:bg-gray-900 p-6 rounded-xl shadow-inner border border-orange-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
          🌍 Explore by Region
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Click a region below to quickly search recipes:
        </p>
        <ul className="flex flex-wrap gap-3">
          {countries === null
            ? Array(12)
                .fill("")
                .map((_, i) => (
                  <li
                    key={i}
                    className="h-8 w-20 bg-orange-300 dark:bg-gray-700 rounded-full animate-pulse"
                  ></li>
                ))
            : countries?.map((item, i) => (
                <li
                  key={i}
                  className="bg-orange-100 dark:bg-gray-700 text-orange-800 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-orange-300 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300"
                  onClick={() => setSearchQuery(item?.strArea)}
                >
                  {item?.strArea}
                </li>
              ))}
        </ul>
      </div>

      {/* Outlet Section */}
      <div ref={outletRef} className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
