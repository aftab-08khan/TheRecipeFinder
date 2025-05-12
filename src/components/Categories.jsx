import React, { useEffect, useState } from "react";
import { Cards, CardsSkeleton } from "./Cards";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      const filterData = data?.categories?.filter(
        (item, i) => item?.strCategory.toLowerCase() !== "pork"
      );

      setCategoriesData(filterData);
    } catch (error) {
      console.log(error, "Error");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categoriesData?.length > 0 ? (
        categoriesData?.map((item, i) => {
          return (
            <Cards
              link={item?.strCategory}
              key={i}
              title={item?.strCategory}
              desc={item?.strCategoryDescription}
              img={item?.strCategoryThumb}
            />
          );
        })
      ) : (
        <CardsSkeleton count={8} /> // Render 8 skeleton cards
      )}
    </ul>
  );
};

export default Categories;
