import React, { ReactElement, useState, useEffect } from "react";
import { Post } from "../../../providers/currentUser/currentUser.type";
import PostItem from "./postItem";
import { useParams } from 'react-router-dom';
import { useApiClient } from "../../../providers/api/apiContext.hook";
import { getPostsByTopicREST } from "./topicPage.service";


const TopicPage: React.FC = (): ReactElement => {
    const { topicId } = useParams<{ topicId: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const apiClient = useApiClient();
  
    useEffect(() => {
      getPostsByTopicREST(apiClient, topicId ?? "").then((posts) => {
        setPosts(posts);
      });
      
    }, [apiClient, topicId]);
  
    return (
        <div>
          <h1 className="text-2xl font-bold mb-4 max-w-screen-lg mx-auto">Forum</h1>
          <ul>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </ul>
        </div>
      );
  };
  
  export default TopicPage;