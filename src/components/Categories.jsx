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
    <ul className="grid grid-cols-4 gap-6 mt-20">
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
        <CardsSkeleton />
      )}
    </ul>
  );
};

export default Categories;
