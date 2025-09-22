import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CustomButton = ({
  children,
  path,
  goBack = false,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const navigate = useNavigate();

  const baseClasses =
    "inline-flex items-center justify-center gap-2 text-captialize transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50";

  const sizeClasses =
    "text-sm md:text-base px-4 py-2 md:px-6 md:py-3 rounded-full";

  const stateClasses = disabled
    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
    : "bg-amber-600 hover:bg-amber-700 text-white hover:shadow-lg hover:-translate-y-1 active:translate-y-0";

  const commonClasses = `${baseClasses} ${sizeClasses} ${stateClasses} ${className}`;

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    if (goBack) navigate(-1);
  };

  if (goBack || onClick) {
    return (
      <button
        type={type}
        onClick={handleClick}
        className={commonClasses}
        disabled={disabled}
      >
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
