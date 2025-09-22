import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-6"
      >
        <h1 className="text-7xl font-extrabold text-gray-800 dark:text-gray-200">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block"
        >
          <Link
            to="/"
            className="px-6 py-3 text-white rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
