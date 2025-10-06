import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { dataContext } from "../../context/dataProvider";
import { API } from "../../service/api";
import { PremiumButton } from "../shared/PremiumButton";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const BlogDetails = () => {
  const { id } = useParams();
  const { posts } = useContext(dataContext);
  const post = posts.find((p) => p._id === id);
  const navigate = useNavigate();

  if (!post) return <div className="text-gray-300 text-center py-20">Post Not Found</div>;

  const handleDelete = async () => {
    try {
      await API.deletePost({ id });
      alert("Post Deleted");
      navigate("/");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center pb-10">
      {/* Hero Image */}
      <div className="relative w-full max-w-6xl h-96 md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
        <img
          src={post.picture}
          alt={post.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Info Card */}
      <div className="relative z-10 -mt-20 w-full max-w-4xl bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-400/20 p-8 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-400">{post.title}</h1>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-start md:items-center text-gray-300">
          <p className="font-semibold">Author: {post.username}</p>
          <p className="font-semibold">Category: {post.category}</p>
          <p className="text-sm text-gray-400">Created On: {post.date}</p>
        </div>

        <p className="text-gray-200 text-lg leading-relaxed">{post.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <Link to={`/update/${id}`}>
            <PremiumButton text="Edit" gradient="from-indigo-600 via-purple-600 to-pink-600" hoverGradient="from-indigo-500 via-purple-500 to-pink-500" />
          </Link>
          <PremiumButton text="Delete" onClick={handleDelete} gradient="from-red-600 via-red-500 to-red-400" hoverGradient="from-red-500 via-red-400 to-red-300" />
        </div>
      </div>
    </div>
  );
};
