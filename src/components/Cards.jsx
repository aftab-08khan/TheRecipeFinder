import { HeartIcon } from "@heroicons/react/16/solid";
import { Link, useNavigate } from "react-router-dom";

const CardsSkeleton = ({ count = 8 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          className="group relative rounded-3xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 animate-pulse"
          key={i}
          style={{
            animationDelay: `${i * 0.1}s`,
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          <div className="relative h-56 bg-gradient-to-r from-amber-200 to-amber-300 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
          </div>

          <div className="p-6">
            <div className="h-7 bg-amber-200 dark:bg-gray-700 rounded-full mb-4 w-3/4"></div>

            <div className="space-y-3 mb-4">
              <div className="h-4 bg-amber-100 dark:bg-gray-600 rounded-full w-full"></div>
              <div className="h-4 bg-amber-100 dark:bg-gray-600 rounded-full w-5/6"></div>
              <div className="h-4 bg-amber-100 dark:bg-gray-600 rounded-full w-4/5"></div>
            </div>

            <div className="h-6 bg-amber-100 dark:bg-gray-700 rounded-full w-20"></div>
          </div>

          <style jsx>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      ))}
    </>
  );
};

const Cards = ({ title, desc, img, id, link, tag }) => {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    e.preventDefault();
    navigate(link, {
      state: id,
    });
  };

  const truncateDescription = (text, maxLength = 120) => {
    if (text?.length <= maxLength) return text;
    return text?.substr(0, maxLength) + "...";
  };

  return (
    <div
      onClick={handleNavigation}
      className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col"
      key={id}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={img}
          alt={title}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105">
            View Recipe
          </button>
        </div>

        {tag && (
          <div className="absolute top-4 left-4">
            <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium border border-white/20">
              #{tag}
            </span>
          </div>
        )}

        <button className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 transform hover:scale-110">
          <HeartIcon className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 line-clamp-2 leading-tight">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow leading-relaxed">
          {truncateDescription(desc)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {tag && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              #{tag}
            </span>
          )}

          <div className="flex items-center space-x-1 text-amber-500 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">View</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-3xl transition-all duration-300 pointer-events-none"></div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/0 via-orange-400/0 to-amber-400/0 group-hover:via-amber-400/5 group-hover:to-orange-400/5 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export { Cards, CardsSkeleton };
