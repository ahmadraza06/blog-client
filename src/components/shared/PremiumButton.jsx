// src/components/shared/PremiumButton.jsx
import React from "react";

export const PremiumButton = ({
  text,
  gradient = "from-indigo-600 via-purple-600 to-pink-600",
  hoverGradient = "from-indigo-500 via-purple-500 to-pink-500",
  className,
  onClick,
  type = "button",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`relative w-full inline-flex items-center justify-center px-6 py-3 text-white 
      bg-gradient-to-r ${gradient} rounded-full overflow-hidden font-semibold shadow-lg 
      hover:scale-105 transition-transform ${className || ""}`}
  >
    {/* Running border */}
    <span className="absolute inset-0 rounded-full p-[2px]">
      <span
        className={`block w-full h-full rounded-full bg-gradient-to-r ${hoverGradient} 
          bg-[length:200%_100%] animate-run-border`}
      ></span>
    </span>

    {/* Overlay */}
    <span className="absolute inset-0 rounded-full bg-black/40 pointer-events-none"></span>

    {/* Text */}
    <span className="relative z-10">{text}</span>

    <style>
      {`
        @keyframes run-border {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-run-border {
          animation: run-border 3s linear infinite;
          background-size: 200% 100%;
        }
      `}
    </style>
  </button>
);
