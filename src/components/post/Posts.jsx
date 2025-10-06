import React, { useEffect, useContext } from "react";
import { API } from "../../service/api";
import { Link, useSearchParams } from "react-router-dom";
import { dataContext } from "../../context/dataProvider";
import { Post} from "./Post";

export const Posts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { posts, setPosts } = useContext(dataContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await API.getPosts({ category: category ? category : "" });
        setPosts(response.data);
      } catch (error) {
        console.log("Error in fetching Posts", error);
      }
    };
    getPosts();
  }, [category]);

  return (
    <div className="p-4 w-full">
  {posts && posts.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 auto-rows-fr">
      {posts.map((post) => (
        <Link key={post._id} to={`/details/${post._id}`}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-gray-400 text-center py-20 text-lg">
      No Blog Available
    </div>
  )}
</div>

  );
};
