export const RunningBorderButton = ({ text, className }) => (
  <button className={`relative inline-flex items-center justify-center ${className || ''} rounded-full text-white font-semibold bg-gray-900/80 overflow-hidden`}>
    {/* Elegant running border with soft gradient */}
    <span className="absolute inset-0 rounded-full p-[1px]">
      <span className="block w-full h-full rounded-full 
        bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500
        bg-[length:200%_100%] animate-run-border"></span>
    </span>

    <span className="absolute inset-0 rounded-full bg-gray-900/80 pointer-events-none"></span>

    <span className="relative z-10">{text}</span>

    <style>{`
      @keyframes run-border {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
      }
      .animate-run-border {
        animation: run-border 3s linear infinite;
        background-size: 200% 100%;
      }
    `}</style>
  </button>
);
