import React from "react";
import { Post } from "../../../providers/currentUser/currentUser.type";

interface LastPostCustomProps {
  post: Post;
}

const LastPostCard: React.FC<LastPostCustomProps> = ({ post }) => {
  const dateOfCreation = new Date(post.creationDate ?? "");
  const formattedDate = dateOfCreation.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex">
      <img
        src={post.author.profilePicture}
        alt="Profile"
        className="w-11 h-11 rounded-full mr-4 self-center"
      />
      <div className="">
        <h2 className="text-xl max-w-28 font-bold overflow-hidden whitespace-nowrap truncate">{post?.title}</h2>
        <p className="text-gray-600">{`by ${post.author?.username}, ${formattedDate}`}</p>
      </div>
    </div>
  );
};

export default LastPostCard;
