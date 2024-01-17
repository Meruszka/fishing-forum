import React from "react";
import { Post } from "./post.type";
import { Link } from 'react-router-dom';

interface PostCustomProps {
    post: Post;
    topicId: string;
}

const PostItem: React.FC<PostCustomProps> = ({ post, topicId }) => {
    const formattedDate = post.creationDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    return (
        <div className="max-w-screen-lg mx-auto"> 
          <div className="bg-white p-4 mb-4 shadow-md rounded-md">
            <Link to={`/forum/topics/${topicId}/${post._id}`} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{`by ${post.author?._id}, ${formattedDate}`}</p>
                </div>
                <div className="flex items-end text-center gap-10"> 
                  <div className="flex flex-col items-center"> 
                    <div className="text-gray-700 mb-2">
                      Replies:
                    </div>
                    <div>
                      {post.responses.length}
                    </div>
                  </div>
                  <div className="self-center">
                    {`last response data`}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
    );
};
  
export default PostItem;