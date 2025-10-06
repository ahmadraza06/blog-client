import React, { useState, useContext, useEffect } from "react";
import { API } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../context/dataProvider";
import { PremiumButton } from "../shared/PremiumButton";

const loginInitialValue = { username: "", password: "" };

export const Login = ({ isUserAuthenticated }) => {
  const [userData, setUserData] = useState(loginInitialValue);
  const [Error, setError] = useState("");
  const navigate = useNavigate();
  const { setData } = useContext(dataContext);

  useEffect(() => {
    sessionStorage.setItem("accessToken", "");
    sessionStorage.setItem("refreshToken", "");
  }, []);

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.userLogin(userData);
      if (response.isSuccess) {
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        setData({
          name: response.data.name,
          username: response.data.username,
        });
        setError("");
        navigate("/");
        isUserAuthenticated(true);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">

      {/* Subtle moving lights */}
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(252,211,77,0.15),transparent_70%)] animate-light-move"></span>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_70%)] animate-light-move animation-delay-5s"></span>

      {/* Glassy Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-indigo-400/20 flex flex-col gap-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center drop-shadow-lg">
          Login
        </h2>

        {Error && <p className="text-red-500 text-center text-sm">{Error}</p>}

        <div className="relative">
          <input
            type="text"
            name="username"
            required
            value={userData.username}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
          <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                             peer-focus:top-1 peer-focus:text-indigo-400 peer-focus:text-sm transition-all">
            Username
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            name="password"
            required
            value={userData.password}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
          <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                             peer-focus:top-1 peer-focus:text-indigo-400 peer-focus:text-sm transition-all">
            Password
          </label>
        </div>

        {/* Premium Button */}
        <PremiumButton 
          onClick={handleLogin}
          text="Login" 
          gradient="from-indigo-600 via-purple-600 to-pink-600" 
          hoverGradient="from-indigo-500 via-purple-500 to-pink-500"
      />

        <p className="text-center text-gray-300">OR</p>

        <button
        type="button"
        onClick={() => navigate("/signup")}
        className="w-full py-3 rounded-xl bg-black/60 border border-indigo-400/20 text-indigo-400 hover:bg-indigo-400 hover:text-black transition"
      >
        Create an Account
      </button>
      </form>

      <style>
        {`
          @keyframes light-move {
            0% { transform: translateX(0px) translateY(0px); opacity: 0.15; }
            50% { transform: translateX(20px) translateY(10px); opacity: 0.2; }
            100% { transform: translateX(0px) translateY(0px); opacity: 0.15; }
          }
          .animate-light-move { animation: light-move 15s linear infinite; }
          .animation-delay-5s { animation-delay: 5s; }
        `}
      </style>
    </div>
  );
};
