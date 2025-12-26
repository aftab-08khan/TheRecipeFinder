import React, { useEffect, useRef, useState } from "react";
import Categories from "../components/Categories";
import "../App.css";
import { useTheme } from "../context/themeContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const categoryRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const fetchRandomMeal = async () => {
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleNavigation = async () => {
    setIsLoading(true);
    const data = await fetchRandomMeal();
    setIsLoading(false);

    navigate(`/recipe/${data?.meals[0]?.strMeal}`, {
      state: { data: data?.meals[0] },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* HEADER */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-amber-200/50 dark:border-gray-700/50"
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🍳</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                RecipeFinder
              </span>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <button onClick={handleScroll} className="nav-link">
                  Category
                </button>
              </li>
              <li>
                <Link to="/ingredient" className="nav-link">
                  Ingredient
                </Link>
              </li>
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-amber-100 dark:bg-gray-800"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-3xl dark:text-gray-50"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </div>
          </nav>
          {/* Mobile Menu */}
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 rounded-2xl bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
            >
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 dark:text-gray-50 border-b dark:border-gray-700"
              >
                Home
              </Link>

              <button
                onClick={() => {
                  handleScroll();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-6 py-4 border-b dark:text-gray-50 dark:border-gray-700"
              >
                Category
              </button>

              <Link
                to="/ingredient"
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 dark:text-gray-50"
              >
                Ingredient
              </Link>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="relative container mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6 border border-amber-200 dark:border-amber-800">
              🍽️ Discover Culinary Excellence
            </span>

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-amber-400 bg-clip-text text-transparent font-playfair leading-tight"
            >
              Savor Every Bite with Recipe Finder
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-8 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Discover delicious meals that will tantalize your taste buds and
              transform your cooking experience. From quick dinners to gourmet
              feasts.
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-12">
              <motion.button
                onClick={handleNavigation}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:shadow-2xl disabled:opacity-50 flex items-center gap-3"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                )}
                {isLoading ? "Loading..." : "Today's Special"}
              </motion.button>

              <Link to="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 font-semibold transition-all duration-300 hover:shadow-2xl flex items-center gap-3"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search Recipes
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <motion.section
        ref={categoryRef}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative py-10"
      >
        <div className="container mx-auto px-3">
          <Categories />
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border-t border-amber-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Made with ❤️ by Aftab Khan • {new Date().getFullYear()}
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
