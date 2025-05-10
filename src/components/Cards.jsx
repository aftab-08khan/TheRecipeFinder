import React from "react";
import { Link } from "react-router-dom";

const CardsSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 7, 8];
  return (
    <>
      {arr.map((item, i) => {
        return (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg bg-[#f3f4f6] animate-pulse"
            key={i}
          >
            <div className="w-full h-48 bg-gray-300"></div>
            <div className="px-6 py-4">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const Cards = ({ title, desc, img, key, link }) => {
  return (
    <Link
      to={link}
      className="max-w-sm rounded overflow-hidden shadow-lg transition-transform transform hover:scale-101 hover:shadow-2xl bg-[#7a7a7a]"
      key={key}
    >
      <img className="w-full h-48 object-cover" src={img} alt={title} />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl text-gray-200 hover:text-[#1e293b] transition-colors">
          {title}
        </h2>
        <p className="text-gray-900 mt-2 line-clamp-4">{desc}</p>
      </div>
    </Link>
  );
};

export { Cards, CardsSkeleton };
