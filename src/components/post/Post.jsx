import React from "react";
import { shortString } from "../../utils/common-utils";

export const Post = ({ post }) => {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-700 w-full h-full">
      
      {/* Post Image */}
      <div className="overflow-hidden rounded-t-3xl h-48">
        <img
          src={post.picture}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-semibold shadow-md">
        {post.category}
      </div>

      {/* Card Content */}
      <div className="p-4 bg-gray-900/80 backdrop-blur-md flex flex-col gap-2 rounded-b-3xl h-[180px]">
        <h2 className="text-lg font-bold text-gray-100 group-hover:text-indigo-400 transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-400 text-sm line-clamp-3">{post.description}</p>

        {/* Read More Button */}
        <div className="mt-auto">
          <button className="w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-sm hover:scale-105 hover:shadow-lg transition-transform duration-300">
            Read More
          </button>
        </div>
      </div>

      {/* Subtle border glow */}
      <span className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 pointer-events-none"></span>
    </div>
  );
};
