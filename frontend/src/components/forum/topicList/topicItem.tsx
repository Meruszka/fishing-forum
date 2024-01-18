import React from "react";
import { Topic } from "../../../providers/currentUser/currentUser.type";
import { Link } from 'react-router-dom';

interface TopicCustomProps {
    topic: Topic;
}

const TopicItem: React.FC<TopicCustomProps> = ({ topic }) => {
    return (
        <div className="max-w-screen-lg mx-auto"> 
          <div className="bg-white p-4 mb-4 shadow-md rounded-md">
            <Link to={`/forum/topics/${topic._id}`} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
                  <p className="text-gray-600 mb-2">{topic.description}</p>
                </div>
                <div className="flex items-end text-center gap-10"> 
                  <div className="flex flex-col items-center"> 
                    <div className="text-gray-700 mb-2">
                      Posts:
                    </div>
                    <div>
                      {topic.numberOfPosts}
                    </div>
                  </div>
                  <div className="self-center">
                    {topic.lastPost ? `Last Post: ${topic.lastPost.title}` : 'No posts in this topic yet'}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
};
  
export default TopicItem;