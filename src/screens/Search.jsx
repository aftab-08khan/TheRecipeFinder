import React, { useState, useEffect } from "react";
import { FiSearch, FiClock, FiX } from "react-icons/fi";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecent, setShowRecent] = useState(false);

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const updatedRecentSearches = [
      searchQuery,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== searchQuery.toLowerCase()
      ),
    ].slice(0, 5); // Keep only 5 most recent

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );

    // In a real app, you would navigate to search results or fetch them here
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    setShowRecent(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Find Your Perfect Recipe
      </h1>

      {/* Search Form */}
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
            placeholder="Search for recipes, ingredients, or categories..."
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

        {/* Recent Searches Dropdown */}
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

      {/* Search Tips */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          How to search
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Search by main ingredient (e.g., "chicken", "salmon")</li>
          <li>Try meal types (e.g., "breakfast", "dessert")</li>
          <li>Search by cuisine (e.g., "Italian", "Chinese")</li>
          <li>Combine terms (e.g., "quick vegetarian dinner")</li>
        </ul>
      </div>
    </div>
  );
};

export default Search;
