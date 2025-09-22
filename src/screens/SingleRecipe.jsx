import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const SingleRecipe = () => {
  const [toggle, setToggle] = useState(false);
  const { recipeId } = useParams();
  const { state } = useLocation();

  const [singleRecipeData, setSingleRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleRecipe = async () => {
    try {
      let res;
      if (state?.data?.idMeal) {
        res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${state?.data?.idMeal}`
        );
      } else if (state) {
        res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${state}`
        );
      } else {
        res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeId}`
        );
      }

      const data = await res.json();
      setSingleRecipeData(data?.meals[0]);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleRecipe();
  }, [recipeId, state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            {/* Back Button Skeleton */}
            <div className="h-10 bg-amber-200 dark:bg-gray-700 rounded-full w-24 mb-8"></div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Image Skeleton */}
              <div className="lg:w-1/2">
                <div className="w-full h-80 lg:h-96 bg-amber-200 dark:bg-gray-700 rounded-3xl shadow-2xl"></div>
              </div>

              {/* Content Skeleton */}
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <div className="h-10 bg-amber-200 dark:bg-gray-700 rounded-2xl w-3/4 mb-4"></div>
                  <div className="flex gap-3 mb-6">
                    <div className="h-8 bg-amber-200 dark:bg-gray-700 rounded-full w-24"></div>
                    <div className="h-8 bg-amber-200 dark:bg-gray-700 rounded-full w-20"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-amber-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-amber-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>

                {/* Instructions Skeleton */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-amber-100 dark:border-gray-700">
                  <div className="h-8 bg-amber-200 dark:bg-gray-700 rounded-2xl w-1/3 mb-6"></div>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 bg-amber-100 dark:bg-gray-600 rounded w-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients Skeleton */}
            <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-amber-100 dark:border-gray-700">
              <div className="h-8 bg-amber-200 dark:bg-gray-700 rounded-2xl w-1/4 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-amber-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 bg-amber-100 dark:bg-gray-600 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!singleRecipeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recipe Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sorry, we couldn't find the recipe you're looking for.
          </p>
          <CustomButton
            goBack
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            Back to Recipes
          </CustomButton>
        </div>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = singleRecipeData[`strIngredient${i}`];
    const measure = singleRecipeData[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  const shouldTruncate = singleRecipeData?.strInstructions?.length > 300;

  const toggleExpand = () => {
    setToggle((prev) => !prev);
  };

  const displayText =
    !shouldTruncate || toggle
      ? singleRecipeData?.strInstructions
      : `${singleRecipeData?.strInstructions?.substring(0, 300)}...`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <CustomButton goBack className="group">
            <svg
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Recipes
          </CustomButton>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="relative group">
              <img
                src={singleRecipeData?.strMealThumb}
                alt={singleRecipeData?.strMeal}
                className="w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Recipe Badges */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-amber-600 dark:text-amber-400 px-4 py-2 rounded-full text-sm font-semibold border border-amber-200 dark:border-amber-800">
                  {singleRecipeData?.strCategory}
                </span>
                <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800">
                  {singleRecipeData?.strArea}
                </span>
              </div>
            </div>

            {/* YouTube Button */}
            {singleRecipeData?.strYoutube && (
              <a
                href={singleRecipeData?.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch on YouTube
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>

          {/* Recipe Details */}
          <div className="lg:w-1/2">
            <div className="flex flex-col h-full justify-between space-y-8">
              {/* Recipe Header */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent font-playfair mb-4">
                  {singleRecipeData?.strMeal}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  A delicious {singleRecipeData?.strMeal?.toLowerCase()} recipe
                  that will delight your taste buds!
                </p>
              </div>

              {/* Instructions Card */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-amber-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-100 dark:border-gray-600">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Cooking Instructions
                  </h2>
                  <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium">
                    {Math.ceil(singleRecipeData?.strInstructions?.length / 200)}{" "}
                    min read
                  </span>
                </div>

                <div className="prose max-w-none dark:prose-invert">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {displayText}
                  </p>
                  {shouldTruncate && (
                    <button
                      onClick={toggleExpand}
                      className="mt-4 inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors duration-200 group"
                    >
                      {toggle ? "Read Less" : "Read More"}
                      <svg
                        className={`w-4 h-4 ml-1 transform transition-transform ${
                          toggle ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Source Link */}
                {singleRecipeData?.strSource && (
                  <div className="mt-8 pt-6 border-t border-amber-100 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Recipe Source
                    </h3>
                    <a
                      href={singleRecipeData?.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 break-words underline hover:no-underline transition-colors duration-200"
                    >
                      {singleRecipeData?.strSource}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-amber-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-100 dark:border-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ingredients
            </h2>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium">
              {ingredients.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-4 rounded-2xl bg-amber-50 dark:bg-gray-700/50 hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
              >
                <span className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full flex items-center justify-center mr-4 font-semibold group-hover:scale-110 transition-transform duration-200">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {item?.measure}
                  </span>{" "}
                  {item?.ingredient}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
