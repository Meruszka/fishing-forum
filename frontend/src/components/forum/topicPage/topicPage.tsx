import React, { ReactElement, useState, useEffect, useCallback } from "react";
import { Post, Topic } from "../../../providers/currentUser/currentUser.type";
import PostItem from "./postItem";
import { useParams } from 'react-router-dom';
import { useApiClient } from "../../../providers/api/apiContext.hook";
import { getPostsByTopicREST } from "./topicPage.service";
import LinkCustom from "../../../common/linkCustom/LinkCustom.component";
import { addPostforTopicId, getTopicREST } from "../topicList/topicList.service";
import ButtonCustom from "../../../common/buttonCustom/buttonCustom.component";
import { useNavigate } from "react-router-dom";

const TopicPage: React.FC = (): ReactElement => {
    const { topicId } = useParams<{ topicId: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [topic, setTopic] = useState<Topic>();
    const [newPostTitle, setNewPostTitle] = useState<string>("");
    const [newPostContent, setNewPostContent] = useState<string>("");
    const [errorInForm, setErrorInForm] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const apiClient = useApiClient();
    const navigate = useNavigate();
  
    useEffect(() => {
      getPostsByTopicREST(apiClient, topicId ?? "").then((posts) => {
        setPosts(posts);
      });
      getTopicREST(apiClient, topicId ?? "").then((topic) => {
        setTopic(topic)
      });
    }, [apiClient, topicId]);

    useEffect(() => {
      setIsLoggedIn(apiClient.isLogged());
    }, [apiClient]);

    const handleButtonClick = useCallback(async () => {
      if(isLoggedIn) {
        setIsFormVisible((prevVisibility) => !prevVisibility)
      } else {
          navigate("/login")
      }
    }, [isLoggedIn, navigate]);

    const handleAddPostClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if(newPostTitle.trim().length === 0) {
        setErrorInForm("Post title can't be empty")
      } else if(newPostContent.trim().length === 0) {
        setErrorInForm("Post content can't be empty")
      } else {
        try {
          const resp = await addPostforTopicId(apiClient, topicId ?? "", newPostTitle, newPostContent);
          setPosts([resp, ...posts])
          console.log(`added post: ${resp.content}`);
          setIsFormVisible(false)
        } catch (error) {
          console.error('Error posting response:', error);
        }
      }
    }, [newPostTitle, newPostContent, topicId, posts, apiClient]);
  
    return (
        <div className="max-w-screen-lg mx-auto">
          <LinkCustom to="/" className="text-gray-400" >Home</LinkCustom>
          <LinkCustom to={`/forum/topics/${topicId}`} className="text-gray-400" >{`>${topic?.name}`}</LinkCustom>
          <h1 className="text-2xl font-bold mb-1">Forum</h1>
          <ButtonCustom
                label={isFormVisible ? "Hide Form" : "Add Post"}
                type="login"
                onClick={handleButtonClick}
                disabled={false}
                className={"mb-4"}
          />
          { isFormVisible && 
            <form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              {errorInForm && (
                <div className="mb-4 text-red-500">{errorInForm}</div>
              )}
              <ButtonCustom
                label="Add Post"
                onClick={(e) => handleAddPostClick(e)}
                type="login"
                disabled={false}
              />
            </form>
          }
          <ul>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </ul>
        </div>
      );
  };
  
  export default TopicPage;