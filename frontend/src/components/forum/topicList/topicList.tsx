import React, { ReactElement, useState } from "react";
import { Topic, getInitialTopics } from "./topicList.type";
import TopicItem from "./topicItem";


const TopicList: React.FC = (): ReactElement => {
    const [topics] = useState<Topic[]>(getInitialTopics());
  
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