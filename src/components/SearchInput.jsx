import React from "react";

const SearchInput = ({ handleInput, value, placeHolder }) => {
  return (
    <div className="flex items-center justify-self-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-300 hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-amber-800"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>

      <input
        type="text"
        value={value}
        placeholder={placeHolder ? placeHolder : "Search a Recipe"}
        onChange={(e) => handleInput(e.target.value)}
        className="outline-none border-none bg-transparent placeholder-amber-600 text-amber-800 w-full"
        aria-label="Search Recipes"
      />
    </div>
  );
};

export default SearchInput;
