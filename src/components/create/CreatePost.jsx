import React, { useEffect, useState, useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { dataContext } from "../../context/dataProvider";
import { API } from "../../service/api";
import { PremiumButton } from "../shared/PremiumButton";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  category: "",
  username: "",
  date: Date.now(),
};

export const CreatePost = () => {
  const { data } = useContext(dataContext);
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const defaultImg =
    "https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080";

  const handleChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);

        try {
          const response = await API.uploadFile(formData);
          setPost((prev) => ({ ...prev, picture: response.data.url }));
        } catch (err) {
          console.log("Image upload error:", err);
        }
      }
    };

    uploadImage();

    // Default category and username
    setPost((prev) => ({
      ...prev,
      category: location.search?.split("=")[1] || "All",
      username: data.username,
      picture: prev.picture || defaultImg,
    }));
  }, [file]);

  const submitHandler = async () => {
    try {
      await API.createPost(post);
      navigate("/");
    } catch (err) {
      console.log("Error creating post:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      <div className="w-full max-w-2xl bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-400/20 p-6 flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center">
          Create New Blog
        </h2>

        {/* Image Preview */}
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border border-indigo-500">
          <img
            src={post.picture || defaultImg}
            alt="Preview"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <label
            htmlFor="file"
            className="absolute bottom-2 right-2 text-indigo-400 text-3xl cursor-pointer hover:text-indigo-600 transition"
          >
            <FaPlusCircle />
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={post.description}
          onChange={handleChange}
          className="w-full px-4 py-3 h-32 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={post.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />

        {/* Publish Button */}
        <PremiumButton
          text="Publish"
          gradient="from-indigo-600 via-purple-600 to-pink-600"
          hoverGradient="from-indigo-500 via-purple-500 to-pink-500"
          onClick={submitHandler}
        />
      </div>
    </div>
  );
};
