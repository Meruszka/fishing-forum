import React, { ReactElement, useState } from "react";
import { Post, getInitialPosts } from "./post.type";
import { getInitialTopics } from "../topicList/topicList.type";
import PostItem from "./postItem";
import { useParams } from 'react-router-dom';

const TopicPage: React.FC = (): ReactElement => {
    const { topicId } = useParams<{ topicId: string }>();
    const topic = getInitialTopics().find(topic => topic._id === topicId);
    const [posts] = useState<Post[]>(getInitialPosts().filter(post => post.topic?._id === topic?._id));
  
    return (
        <div>
          <h1 className="text-2xl font-bold mb-4 max-w-screen-lg mx-auto">Forum</h1>
          <ul>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} topicId={topicId ?? "topic"} />
            ))}
          </ul>
        </div>
      );
  };
  
  export default TopicPage;