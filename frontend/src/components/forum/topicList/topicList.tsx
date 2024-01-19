import React, { ReactElement, useState, useEffect } from "react";
import { Topic } from "../../../providers/currentUser/currentUser.type";
import TopicItem from "./topicItem";
import { useApiClient } from "../../../providers/api/apiContext.hook";
import { getTopicsREST } from "./topicList.service";
import LinkCustom from "../../../common/linkCustom/LinkCustom.component";

const TopicList: React.FC = (): ReactElement => {
    const [topics, setTopics] = useState<Topic[]>([]);
    // const [posts, setPosts] = useState<Post[]>([]);
    const apiClient = useApiClient();
  
    useEffect(() => {
      getTopicsREST(apiClient).then((topics) => {
        setTopics(topics);
      });
      // getLastPosts(apiClient).then((posts) => {
      //   setPosts(posts);
      // });
    }, [apiClient]);
  

    return (
        <div className="max-w-screen-lg mx-auto">
          <LinkCustom to="/" className="text-gray-400" >Home</LinkCustom>
          <h1 className="text-2xl font-bold mb-4">Forum</h1>
          <ul>
            {topics.map((topic) => (
              <TopicItem key={topic._id} topic={topic} />
            ))}
          </ul>
        </div>
      );
  };
  
  export default TopicList;