import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomButton = ({ children, path, goBack = false }) => {
  const navigate = useNavigate();

  const commonClasses =
    "text-captialize ml-2 md:text-xl text-md md:font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center gap-2 justify-self-start mb-4";

  if (goBack) {
    return (
      <button onClick={() => navigate(-1)} className={commonClasses}>
        {children}
      </button>
    );
  }

  return (
    <Link to={path} className={commonClasses}>
      {children}
    </Link>
  );
};

export default CustomButton;
