import React from "react";
import { PremiumButton } from "../shared/PremiumButton";

export const Banner = () => {
  return (
    <div className="relative h-[60vh] overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Soft floating lights */}
      <span className="absolute top-[-50px] left-[-50px] w-60 h-60 bg-yellow-300/30 rounded-full blur-3xl animate-light-move"></span>
      <span className="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-light-move animation-delay-5s"></span>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 h-full">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg mb-4">
          BLOG
        </h1>
        <p className="text-white/90 md:text-lg mb-6 max-w-xl">
          Discover amazing features and services that await you.
        </p>
        <PremiumButton text="Get Started" className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-base" />
      </div>

      <style>
        {`
        @keyframes light-move {
          0% { transform: translate(0px, 0px); opacity: 0.15; }
          50% { transform: translate(15px, 10px); opacity: 0.2; }
          100% { transform: translate(0px, 0px); opacity: 0.15; }
        }
        .animate-light-move {
          animation: light-move 15s linear infinite;
        }
        .animation-delay-5s {
          animation-delay: 5s;
        }
      `}
      </style>
    </div>
  );
};
