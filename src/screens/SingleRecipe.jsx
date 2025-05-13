import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const SingleRecipe = () => {
  const { recipeId } = useParams();
  const [singleRecipeData, setSingleRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleRecipe = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeId}`
      );

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
  }, [recipeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
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
      <div className="flex flex-col md:flex-row gap-8 mb-12">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
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
        </div> */}

        {/* Instructions Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            Instructions
          </h2>
          <div className="prose max-w-none">
            {singleRecipeData?.strInstructions
              ?.split("\r\n")
              .filter((step) => step.trim() !== "")
              .map((step, index) => (
                <div key={index} className="mb-4 flex">
                  <span className=" w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
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
