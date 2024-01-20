import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Post,
  Response,
} from "../../../providers/currentUser/currentUser.type";
import { useParams } from "react-router-dom";
import {
  getPostByIdREST,
  addResponseForPostId,
} from "../topicPage/topicPage.service";
import { useApiClient } from "../../../providers/api/apiContext.hook";
import ResponseItem from "./responseItem";
import LinkCustom from "../../../common/linkCustom/LinkCustom.component";
import ButtonCustom from "../../../common/buttonCustom/buttonCustom.component";
import UserCard from "./userCard";
import { useCurrentUser } from "../../../providers/currentUser/currentUser.hook";

const PostPage: React.FC = () => {
  const { topicId, postId } = useParams<{ topicId: string; postId: string }>();
  const [post, setPost] = useState<Post>();
  const [responses, setResponses] = useState<Response[]>([]);
  const [newResponse, setNewResponse] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [responseError, setResposeError] = useState<boolean>(false);
  const { apiClient } = useApiClient();
  const user = useCurrentUser();
  const navigate = useNavigate();
  const croppedPostTitle = useMemo(() => {
    if (post?.title.length ?? 0 > 30) {
      return post?.title.substring(0, 30) + "...";
    } else {
      return post?.title;
    }
  }, [post?.title]);

  const creationDate = new Date(post?.creationDate ?? "");
  const formattedDate = creationDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const post = await getPostByIdREST(apiClient, postId ?? "");
        setPost(post);
        setResponses(post.responses);
      } catch (error) {
        setResposeError(true);
      }
    };

    fetch();
  }, [apiClient, postId]);

  useEffect(() => {
    setIsLoggedIn(apiClient.isLoggedIn());
  }, [apiClient]);

  const handleButtonClick = useCallback(async () => {
    if (isLoggedIn) {
      try {
        const resp = await addResponseForPostId(
          apiClient,
          postId ?? "",
          newResponse
        );
        setNewResponse("");
        setResponses([...responses, resp]);
        console.log(`added response: ${resp.content}`);
      } catch (error) {
        console.error("Error posting response:", error);
      }
    } else {
      navigate("/login");
    }
  }, [postId, newResponse, navigate, apiClient, isLoggedIn, responses]);

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {responseError ? (
        <div>Post not found</div>
      ) : (
        <div>
          <LinkCustom to="/" className="text-gray-400">
            Home
          </LinkCustom>
          <LinkCustom
            to={`/forum/topics/${topicId}`}
            className="text-gray-400"
          >{`>${post?.topic.name}`}</LinkCustom>
          <LinkCustom
            to={`/forum/topics/${topicId}/post/${postId}`}
            className="text-gray-400 text-pretty"
          >{`>${croppedPostTitle}`}</LinkCustom>

          <h1 className="text-2xl font-bold mb-1">{post?.title}</h1>
          <ButtonCustom
            label="Add Response"
            type="login"
            onClick={scrollToBottom}
            disabled={false}
            className={"mb-4"}
          />
          <div className="flex bg-white p-4 mb-4 shadow-md rounded-md">
            <div className="mr-4 w-1/4">
              <UserCard userId={post?.author._id ?? ""} usr={user} />
            </div>
            <div className="w-3/4">
              <p className="text-gray-600 font-bold">{post?.title}</p>
              <p className="text-gray-500">{formattedDate}</p>
              <div className="mt-2">
                <p>{post?.content}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">Responses</h1>
            <ul>
              {responses.length === 0 ? (
                <h3 className="text-2xl font-bold mb-4">
                  No responses for now :((
                </h3>
              ) : (
                responses.map((response) => (
                  <ResponseItem
                    key={response._id}
                    response={response}
                    postTitle={post?.title ?? ""}
                  />
                ))
              )}
            </ul>
          </div>
          <div className="max-w-screen-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Response</h1>
            <div className="flex mb-4">
              <textarea
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type your response here..."
              />
            </div>
            <ButtonCustom
              label="Add Response"
              type="login"
              onClick={handleButtonClick}
              disabled={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
