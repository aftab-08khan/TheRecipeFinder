import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({ children, path }) => {
  return (
    <Link
      to={path}
      className="ml-2 font-semibold px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 justify-self-start mb-4"
    >
      {children}
    </Link>
  );
};

export default CustomButton;
