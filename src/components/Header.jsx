import React, { useEffect, useState } from "react";

const Header = ({ id, children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 px-4 py-2 w-full z-50 transition-colors duration-300 ${
        isScrolled && "bg-white shadow-md"
      } ${isScrolled && "flex gap-4 items-center"}`}
    >
      {children}
      <h1
        className={`text-4xl px-2 font-bold ${
          isScrolled ? "mb-2" : "mb-10"
        }  text-center text-amber-900 relative inline-block group`}
      >
        <span className="capitalize">{id}</span> Meals
        <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </h1>
    </header>
  );
};

export default Header;
