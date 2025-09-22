import React, { useEffect, useState } from "react";
import { Cards, CardsSkeleton } from "./Cards";
import SearchInput from "./SearchInput";
import Alert from "./Alert";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [filteredCategoriesData, setFilteredCategoriesData] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      const filterData = data?.categories?.filter(
        (item, i) => item?.strCategory?.toLowerCase() !== "pork"
      );

      setCategoriesData(filterData);
      setFilteredCategoriesData(filterData);
    } catch (error) {
      console.log(error, "Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (val) => {
    setInputVal(val);

    if (!val) {
      setFilteredCategoriesData(categoriesData);
      return;
    }

    const filtered = categoriesData?.filter((item) =>
      item?.strCategory?.toLowerCase().includes(val?.toLowerCase())
    );

    setFilteredCategoriesData(filtered);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      {/* Search Section */}
      <div className="mb-12 text-center">
        <div className="relative inline-block mb-4">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <h2 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent font-playfair">
            Recipe Categories
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our diverse collection of culinary categories. Find your next
          favorite recipe!
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <SearchInput
          handleInput={handleInput}
          value={inputVal}
          placeHolder="Search for categories like Beef, Chicken, Dessert..."
        />
      </div>

      {!isLoading && filteredCategoriesData && (
        <div className="flex justify-between items-center mb-8 px-4">
          <p className="text-gray-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {filteredCategoriesData.length}
            </span>{" "}
            categories
            {inputVal && (
              <span>
                {" "}
                for "<span className="font-semibold">{inputVal}</span>"
              </span>
            )}
          </p>

          {inputVal && (
            <button
              onClick={() => handleInput("")}
              className="px-4 py-2 text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <CardsSkeleton count={8} />
          </div>
        ) : filteredCategoriesData?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCategoriesData.map((item, i) => (
              <div
                key={i}
                className="transform hover:scale-105 transition-transform duration-300"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <Cards
                  link={`category/${item?.strCategory}`}
                  title={item?.strCategory}
                  desc={item?.strCategoryDescription}
                  img={item?.strCategoryThumb}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <Alert>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No categories found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {inputVal
                    ? `No results for "${inputVal}". Try searching for something else.`
                    : "No categories available at the moment."}
                </p>
              </Alert>
            </div>
          </div>
        )}
      </div>

      {/* Loading Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Categories;
