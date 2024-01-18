import React, { ReactElement, useState, useEffect } from "react";
import { Topic } from "../../../providers/currentUser/currentUser.type";
import TopicItem from "./topicItem";
import { useApiClient } from "../../../providers/api/apiContext.hook";
import { getTopicsREST } from "./topicList.service";


const TopicList: React.FC = (): ReactElement => {
    const [topics, setTopics] = useState<Topic[]>([]);
    const apiClient = useApiClient();
  
    useEffect(() => {
      getTopicsREST(apiClient).then((topics) => {
        setTopics(topics);
      });
      
    }, [apiClient]);
  

    return (
        <div>
          <h1 className="text-2xl font-bold mb-4 max-w-screen-lg mx-auto">Forum</h1>
          <ul>
            {topics.map((topic) => (
              <TopicItem key={topic._id} topic={topic} />
            ))}
          </ul>
        </div>
      );
  };
  
  export default TopicList;