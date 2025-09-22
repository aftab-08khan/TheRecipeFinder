// SearchInput.jsx - Modernized version
import React from "react";

const SearchInput = ({ handleInput, value, placeHolder }) => {
  return (
    <div className="relative w-full group">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400 z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          placeholder={placeHolder}
          className="w-full pl-12 pr-6 py-4 bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-amber-400 dark:focus:border-amber-400 transition-all duration-300 shadow-lg"
        />
        {value && (
          <button
            onClick={() => handleInput("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
