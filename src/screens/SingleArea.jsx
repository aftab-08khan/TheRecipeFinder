import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Cards } from "../components/Cards";

const SingleArea = () => {
  const { state, pathname } = useLocation();
  console.log(location);

  return (
    <div className=" mt-20">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        Search for :{" "}
        <span className="text-amber-900  font-playfair">
          {pathname.split("/").pop().toUpperCase()}
        </span>
      </h3>
      <div className="mt-6 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {state?.map((item, i) => {
          return (
            <Cards
              key={i}
              id={item?.idMeal}
              link={`/recipe/${item?.idMeal}`}
              img={item?.strMealThumb}
              title={item?.strMeal}
              tag={pathname.split("/").pop()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SingleArea;
