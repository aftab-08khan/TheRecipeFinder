import React, { useEffect, useState } from "react";
import { Cards, CardsSkeleton } from "./Cards";
import SearchInput from "./SearchInput";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [filteredCategoriesData, setFilteredCategoriesData] = useState(null);

  const [inputVal, setInputVal] = useState("");
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
      setFilteredCategoriesData(filterData);
    } catch (error) {
      console.log(error, "Error");
    }
  };
  const handleInput = (val) => {
    setInputVal(val);

    if (!val) {
      setFilteredCategoriesData(categoriesData);
      return;
    }

    const filtered = categoriesData?.filter((item) =>
      item.strCategory.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredCategoriesData(filtered);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <SearchInput
        handleInput={handleInput}
        value={inputVal}
        placeHolder="Search for Category"
      />
      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {categoriesData?.length > 0 ? (
          filteredCategoriesData?.map((item, i) => {
            return (
              <Cards
                link={`category/${item?.strCategory}`}
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
    </div>
  );
};

export default Categories;
