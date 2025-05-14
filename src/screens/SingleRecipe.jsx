import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const SingleRecipe = () => {
  const { recipeId } = useParams();
  const { state } = useLocation();

  const [singleRecipeData, setSingleRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleRecipe = async () => {
    try {
      let res;
      if (state) {
        res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${state}`
        );
      } else {
        res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeId}`
        );
      }

      const data = await res.json();

      setSingleRecipeData(data?.meals[0] || data);
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
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <CustomButton goBack>Back</CustomButton>

        <div className="flex flex-col mt-10 md:flex-row gap-8 mb-12">
          <div className="md:w-1/2">
            <div className="w-full h-64 md:h-96 bg-amber-200 rounded-lg shadow-xl"></div>
          </div>

          <div className="md:w-1/2 space-y-6">
            <div className="h-10 bg-amber-500 rounded w-3/4"></div>

            <div className="flex gap-4">
              <div className="h-6 bg-amber-200 rounded-full w-20"></div>
              <div className="h-6 bg-amber-200 rounded-full w-20"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-amber-200 rounded w-full"></div>
              <div className="h-4 bg-amber-200 rounded w-5/6"></div>
              <div className="h-4 bg-amber-200 rounded w-4/6"></div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-8 bg-amber-200 rounded w-1/3 mb-6"></div>
              <ul className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-6 h-6 bg-amber-200 rounded-full mr-3"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                      <div className="h-4 bg-amber-200 rounded w-1/2"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-12 bg-amber-200 rounded-lg w-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-8 bg-amber-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-amber-200 rounded w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!singleRecipeData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Recipe not found</p>
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <CustomButton goBack>Back</CustomButton>
      <div className="flex flex-col mt-10 md:flex-row gap-8 mb-12">
        <div className="md:w-1/2">
          <img
            src={singleRecipeData?.strMealThumb}
            alt={singleRecipeData?.strMeal}
            className="w-full h-auto rounded-lg shadow-xl object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {singleRecipeData?.strMeal}
              </h1>
              <div className="flex gap-4 mb-6">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  {singleRecipeData?.strCategory}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {singleRecipeData?.strArea}
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                A delicious {singleRecipeData?.strMeal?.toLowerCase()} recipe
                that you'll love!
              </p>
            </div>
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredients?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className=" w-6 h-6 bg-orange-100 text-orange-800 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">
                      <span className="font-medium">{item?.measure}</span>{" "}
                      {item?.ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {singleRecipeData?.strYoutube && (
              <a
                href={singleRecipeData?.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Watch on YouTube
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="lg:col-span-2 w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Instructions
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700">{singleRecipeData?.strInstructions}</p>
          </div>

          {singleRecipeData?.strSource && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Source</h3>
              <a
                href={singleRecipeData?.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 hover:underline"
              >
                {singleRecipeData?.strSource}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
