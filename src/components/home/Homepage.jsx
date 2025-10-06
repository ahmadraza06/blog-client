import React from "react";
import { Categories } from "./Categories";
import { Posts } from "../post/Posts";
import { PremiumButton } from "../shared/PremiumButton";

export const Homepage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      
      {/* Banner */}
      <section className="relative w-full h-[50vh] md:h-[60vh] bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 drop-shadow-lg">
            BLOG
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl">
            Discover amazing features and services that await you.
          </p>
          <div className="mt-6">
            <PremiumButton text="Get Started" />
          </div>
        </div>
      </section>

      {/* Categories + Posts */}
      <section className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        
        {/* Categories Panel */}
        <div className="md:w-1/4 w-full flex flex-col gap-6">
          <Categories />
        </div>

        {/* Posts Panel */}
        <div className="md:w-3/4 w-full">
          <Posts />
        </div>
      </section>
    </div>
  );
};
