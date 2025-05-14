import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { CardsSkeleton } from "../components/Cards";
import Header from "../components/Header";

const SingleCategories = () => {
  const { categoryId } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSingleCategories = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryId}`
      );
      const data = await res.json();
      setMeals(data?.meals || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleCategories();
  }, [categoryId]);

  return (
    <div className="py-4  mx-auto min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Header id={categoryId}>
        <CustomButton on path={"/"}>
          Back
        </CustomButton>
      </Header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-amber-200 h-12 w-12"></div>
          </div>
        </div>
      ) : meals?.length > 0 ? (
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-12">
          {meals?.length < 0 || meals == [] ? (
            <CardsSkeleton count={8} />
          ) : (
            meals?.map((meal) => (
              <Link
                to={`/recipe/${meal?.strMeal}`}
                key={meal?.idMeal}
                className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={meal?.strMealThumb}
                    alt={meal?.strMeal}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200">
                      View Recipe
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {meal?.strMeal}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-600 font-medium">
                      {meal?.strArea || "International"}
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                      #{categoryId}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-amber-800 text-xl font-medium">
            No meals found in this category.
          </div>
          <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full transition-colors duration-200">
            Browse Other Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleCategories;
