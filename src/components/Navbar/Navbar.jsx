import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    sessionStorage.setItem("accessToken", "");
    sessionStorage.setItem("refreshToken", "");
    navigate("/login");
  };

  const navItems = ["Home", "About", "Services", "Pricing", "Contact"];

  return (
    <nav className="fixed w-full backdrop-blur-md bg-black/70 shadow-xl z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-700 hover:scale-105 transition-transform">
          <Link to="/">MyBlog</Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {navItems.map((item) => {
            const isActive = location.pathname === `/${item.toLowerCase()}`;
            return (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()=='home'?'':item.toLocaleLowerCase()}`}
                  className={`relative px-3 py-2 rounded-md group transition-all duration-300
                    ${isActive ? "text-yellow-400" : "text-gray-200 hover:text-yellow-400"}`}
                >
                  <span className="relative z-10">{item}</span>
                  {/* Active / hover underline */}
                  <span
                    className={`absolute left-1/2 bottom-0 h-[2px] bg-yellow-400 transition-all duration-300 
                    ${isActive ? "w-full left-0" : "w-0 group-hover:w-full group-hover:left-0"}`}
                  ></span>
                  {/* Hover subtle glow */}
                  <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 
                                bg-yellow-500/20 blur-sm transition duration-300"></span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Log Out Button */}
        <RunningBorderButton onClick={handleLogOut} text="Log Out" />

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-200 ml-3 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/90 shadow-2xl transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out md:hidden z-40 backdrop-blur-md`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <span className="text-xl font-bold text-yellow-400">MyBrand</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-gray-200" />
          </button>
        </div>

        <ul className="flex flex-col space-y-4 p-6 font-medium">
          {navItems.map((item) => {
            const isActive = location.pathname === `/${item.toLowerCase()}`;
            return (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className={`relative block px-3 py-2 rounded-md transition-all duration-300
                    ${isActive ? "text-yellow-400" : "text-gray-200 hover:text-yellow-400"}`}
                >
                  <span className="relative z-10">{item}</span>
                  <span
                    className={`absolute left-1/2 bottom-0 h-[2px] bg-yellow-400 transition-all duration-300 
                    ${isActive ? "w-full left-0" : "w-0 group-hover:w-full group-hover:left-0"}`}
                  ></span>
                  <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 
                                bg-yellow-500/20 blur-sm transition duration-300"></span>
                </Link>
              </li>
            );
          })}
          <li>
            <RunningBorderButton onClick={handleLogOut} text="Log Out" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Subtle running-border button component
const RunningBorderButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center px-6 py-2 text-sm font-semibold text-yellow-400 
                 bg-black/80 rounded-full overflow-hidden focus:outline-none"
    >
      {/* Outer running border */}
      <span className="absolute inset-0 rounded-full p-[2px]">
        <span className="block w-full h-full rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
                         bg-[length:200%_100%] animate-run-border"></span>
      </span>

      {/* Inner mask to keep button background clean */}
      <span className="absolute inset-0 rounded-full bg-black/80 pointer-events-none"></span>

      {/* Button content */}
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
};
