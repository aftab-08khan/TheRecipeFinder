import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CardsSkeleton } from "../components/Cards";

import { BiArrowBack } from "react-icons/bi";

const SingleCategories = () => {
  const { categoryId } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState(null);

  const fetchSingleCategories = async () => {
    try {
      setLoading(true);
      const [mealsRes, categoryRes] = await Promise.all([
        fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`
        ),
        fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`),
      ]);

      const mealsData = await mealsRes.json();
      const categoriesData = await categoryRes.json();

      setMeals(mealsData?.meals || []);

      // Get category details for description
      const currentCategory = categoriesData?.categories?.find(
        (cat) => cat.strCategory === categoryId
      );
      setCategoryInfo(currentCategory);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleCategories();
  }, [categoryId]);

  // Format category name for display
  const formatCategoryName = (name) => {
    return name?.replace(/([A-Z])/g, " $1").trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-amber-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group flex items-center space-x-3 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300"
            >
              <BiArrowBack className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-4">
              <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium border border-amber-200 dark:border-amber-800">
                {meals.length} recipes
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 dark:from-amber-600/5 dark:to-orange-600/5"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full mb-6 border border-amber-200 dark:border-amber-800">
            <span>🍽️</span>
            <span className="font-medium">Category</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent font-playfair">
            {formatCategoryName(categoryId)}
          </h1>

          {categoryInfo && (
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {categoryInfo.strCategoryDescription?.split(". ")[0]}.
            </p>
          )}
        </div>

        <div className="absolute top-10 right-10 w-20 h-20 bg-amber-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-orange-300/20 rounded-full blur-xl"></div>
      </section>

      <section className="relative py-12">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <CardsSkeleton count={8} />
            </div>
          ) : meals.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Recipes
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {meals.length} {meals.length === 1 ? "recipe" : "recipes"}{" "}
                  available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {meals.map((meal, index) => (
                  <Link
                    to={`/recipe/${meal?.strMeal}`}
                    key={meal?.idMeal}
                    className="group relative block overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={meal?.strMealThumb}
                        alt={meal?.strMeal}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg">
                            View Recipe
                          </button>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          #{categoryId}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                        {meal?.strMeal}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                          {meal?.strArea || "International"}
                        </span>
                        <div className="flex items-center space-x-1 text-amber-400">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium">Recipe</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-3xl transition-all duration-300 pointer-events-none"></div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No Recipes Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Sorry, we couldn't find any recipes in the{" "}
                  {formatCategoryName(categoryId)} category at the moment.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  <span>Browse Other Categories</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

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

export default SingleCategories;
