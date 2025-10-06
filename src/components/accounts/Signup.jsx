import React, { useState } from 'react';
import { API } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import { PremiumButton } from '../shared/PremiumButton';

const signUPInitialValue = {
  name: '',
  username: '',
  password: ''
};

export const SignUP = ({ setLogin }) => {
  const [userData, setUserData] = useState(signUPInitialValue);
  const [Error, setError] = useState('');
  const navigate = useNavigate();

  const userInputHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let response = await API.userSignup(userData);
      if (response.isSuccess) {
        setUserData(signUPInitialValue);
        setLogin('login');
      } else {
        setError('Sign up failed. Try again.');
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">

      {/* Subtle moving lights */}
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(252,211,77,0.15),transparent_70%)] animate-light-move"></span>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(252,211,77,0.1),transparent_70%)] animate-light-move animation-delay-5s"></span>

      {/* Glass sign-up card */}
      <form
        onSubmit={handleSignUp}
        className="relative z-10 w-full max-w-md bg-black/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-yellow-400/20 flex flex-col gap-6"
      >
        <h2 className="text-4xl font-bold text-yellow-400 text-center tracking-wide drop-shadow-lg">
          Create Account
        </h2>

        {Error && <p className="text-red-500 text-xs text-center">{Error}</p>}

        {/* Name */}
        <div className="relative">
          <input
            type="text"
            required
            name="name"
            value={userData.name}
            onChange={userInputHandler}
            placeholder=" "
            className="peer w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />
          <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
                             peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-yellow-400 peer-focus:text-sm transition-all">
            Name
          </label>
        </div>

        {/* Username */}
        <div className="relative">
          <input
            type="text"
            required
            name="username"
            value={userData.username}
            onChange={userInputHandler}
            placeholder=" "
            className="peer w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />
          <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
                             peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-yellow-400 peer-focus:text-sm transition-all">
            Username
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            required
            name="password"
            value={userData.password}
            onChange={userInputHandler}
            placeholder=" "
            className="peer w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
          />
          <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400
                             peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-yellow-400 peer-focus:text-sm transition-all">
            Password
          </label>
        </div>


        

        <PremiumButton
            onClick={handleSignUp}
            text="Sign Up"
            gradient="from-indigo-600 via-purple-600 to-pink-600"
            hoverGradient="from-indigo-500 via-purple-500 to-pink-500"
        />
        <p className="text-center text-gray-300">OR</p>
        <button
        type="button"
        onClick={() => navigate("/login")}
        className="w-full py-3 rounded-xl bg-black/60 border border-indigo-400/20 text-indigo-400 hover:bg-indigo-400 hover:text-black transition"
        >
        Already have an Account
        </button>
      </form>

      {/* Tailwind animations */}
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

          @keyframes light-move {
            0% { transform: translateX(0px) translateY(0px); opacity: 0.15; }
            50% { transform: translateX(20px) translateY(10px); opacity: 0.2; }
            100% { transform: translateX(0px) translateY(0px); opacity: 0.15; }
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

// Running-border button component
const RunningBorderButton = ({ text }) => (
  <button
    type="submit"
    className="relative w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-yellow-400 
               bg-black/80 rounded-full overflow-hidden focus:outline-none mt-2"
  >
    <span className="absolute inset-0 rounded-full p-[2px]">
      <span className="block w-full h-full rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
                       bg-[length:200%_100%] animate-run-border"></span>
    </span>

    <span className="absolute inset-0 rounded-full bg-black/80 pointer-events-none"></span>

    <span className="relative z-10">{text}</span>
  </button>
);
