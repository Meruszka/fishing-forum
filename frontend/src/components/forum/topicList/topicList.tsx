import React, { ReactElement, useState, useEffect } from "react";
import { Topic, Post } from "../../../providers/currentUser/currentUser.type";
import TopicItem from "./topicItem";
import { useApiClient } from "../../../providers/api/apiContext.hook";
import { getTopicsREST, getLastPosts } from "./topicList.service";
import LinkCustom from "../../../common/linkCustom/LinkCustom.component";
import LastPostCard from "./lastPostCard";
import { Link } from 'react-router-dom';

const TopicList: React.FC = (): ReactElement => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const { apiClient } = useApiClient();
  
    useEffect(() => {
      getTopicsREST(apiClient).then((topics) => {
        setTopics(topics);
      });
      getLastPosts(apiClient).then((posts) => {
        setPosts(posts);
      });
    }, [apiClient]);
  

    return (
      <div className="max-w-screen-lg mx-auto">
        <LinkCustom to="/" className="text-gray-400" >Home</LinkCustom>
        <h1 className="text-2xl font-bold mb-4">Forum</h1>
        <div className="flex"> 
          <ul key={"topics"} className="w-full"> 
            {topics.map((topic) => (
              <TopicItem key={topic._id} topic={topic} />
            ))}
          </ul>
          <div className="ml-4 h-full bg-white p-4 mb-4 shadow-md rounded-md ">
            <h1 className="text-center text-xl font-bold mb-4" >Last Posts</h1>
            <ul key={"posts"}>
              {posts.map((post) => (
              <Link key={post._id} to={`/forum/topics/${post.topic._id}/post/${post._id}`}>
                <LastPostCard key={post._id} post={post} />
              </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      );
  };
  
  export default TopicList;