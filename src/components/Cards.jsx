import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CardsSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          className="rounded-xl overflow-hidden shadow-md w-full bg-amber-50 animate-pulse"
          key={i}
        >
          <div className="w-full h-48 bg-amber-200"></div>
          <div className="p-5">
            <div className="h-6 bg-amber-300 rounded-full mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-amber-200 rounded-full w-4/5"></div>
              <div className="h-4 bg-amber-200 rounded-full w-3/4"></div>
              <div className="h-4 bg-amber-200 rounded-full w-5/6"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const Cards = ({ title, desc, img, id, link, tag }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(link, {
      state: id,
    });
  };
  return (
    <div
      onClick={handleNavigation}
      className="group relative rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col"
      key={id}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={img}
          alt={title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-5 flex-grow items-baseline flex flex-col">
        <h2 className="font-bold text-xl text-amber-900 mb-2 group-hover:text-amber-700 transition-colors duration-200 line-clamp-2">
          {title}
        </h2>
        <p className="text-amber-800 mt-2 line-clamp-3 flex-grow">{desc}</p>
        {tag && (
          <span className=" capitalize text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ">
            # {tag}
          </span>
        )}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            View Recipe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export { Cards, CardsSkeleton };
