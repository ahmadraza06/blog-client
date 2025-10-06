import React from "react";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";
import { PremiumButton } from "../shared/PremiumButton";

export const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  return (
    <div className="flex flex-col gap-6 bg-gray-800/70 backdrop-blur-md rounded-3xl p-4 shadow-lg">
      
      {/* Create Blog Button */}
      <Link to={`/create/?category=${category}`}>
        <PremiumButton text="Create Blog" className="w-full py-3" />
      </Link>

      {/* Categories Table */}
      <div className="flex flex-col gap-3">
        <Link
          to={"/"}
          className="px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-semibold text-center transition"
        >
          All Categories
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/?category=${cat.type}`}
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-indigo-600 text-white font-medium transition"
          >
            {cat.type}
          </Link>
        ))}
      </div>
    </div>
  );
};
