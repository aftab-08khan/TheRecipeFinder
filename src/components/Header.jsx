import React, { useEffect } from "react";

const Header = ({ id, children }) => {
  useEffect(() => {
    const scrollHandler = () => {
      const scrollY = window.scrollY;
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className="sticky top-0 w-full z-50 bg-gradient-to-b from-amber-50 to-amber-100">
      {children}
      <h1 className="text-4xl px-2 font-bold mb-10 text-center text-amber-900 relative inline-block group">
        <span className="capitalize">{id}</span> Meals
        <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </h1>
    </header>
  );
};

export default Header;
