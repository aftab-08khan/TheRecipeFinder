import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleCategories = () => {
  const { id } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSingleCategories = async () => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
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
  }, [id]);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Meals in <span className="capitalize">{id}</span>
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading meals...</div>
      ) : meals?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals?.map((meal) => (
            <div
              key={meal?.idMeal}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-101"
            >
              <img
                src={meal?.strMealThumb}
                alt={meal?.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {meal?.strMeal}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No meals found.</div>
      )}
    </div>
  );
};

export default SingleCategories;
