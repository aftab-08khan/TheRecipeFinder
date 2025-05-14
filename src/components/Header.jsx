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
      className={`
        sticky top-0 w-full z-50 px-4 flex flex-col items-baseline
        transition-all duration-500 ease-in-out
        ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-6"}
      `}
    >
      {children}

      <h1
        className={`
           text-2xl md:text-3xl font-bold text-amber-900 text-center relative inline-block group
          transition-all duration-500 ease-in-out
          ${isScrolled ? "mb-2" : "mb-10"}
        `}
      >
        <span className="capitalize">{id}</span> Meals
        <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </h1>
    </header>
  );
};

export default Header;
