import React, { useMemo } from "react";
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

  const croppedPostTitle = useMemo(() => {
    if (post?.title.length > 15) {
      return post?.title.substring(0, 15) + "...";
    } else {
      return post?.title;
    }
  }, [post?.title]);

  return (
    <div className="flex">
      <img
        src={post.author.profilePicture}
        alt="Profile"
        className="w-11 h-11 rounded-full mr-4 self-center"
      />
      <div>
        <h2 className="text-xl font-bold">{croppedPostTitle}</h2>
        <p className="text-gray-600">{`by ${post.author?.username}, ${formattedDate}`}</p>
      </div>
    </div>
  );
};

export default LastPostCard;
