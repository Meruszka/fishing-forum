import React from "react";
import { Post } from "../../../providers/currentUser/currentUser.type";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface PostCustomProps {
    post: Post;
}

const PostItem: React.FC<PostCustomProps> = ({ post }) => {
  const creationDate = new Date(post.creationDate)
  const formattedDate = creationDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
  });
    const { topicId } = useParams<{ topicId: string }>();

    return (
        <div className="max-w-screen-lg mx-auto"> 
          <div className="bg-white p-4 mb-4 shadow-md rounded-md">
            <Link to={`/forum/topics/${topicId}/post/${post._id}`} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{`by ${post.author?.username}, ${formattedDate}`}</p>
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