import React, { useState, useEffect } from "react";
import { Post, Response } from "../../../providers/currentUser/currentUser.type";
import { useParams } from 'react-router-dom';
import { getPostByIdREST } from "../topicPage/topicPage.service";
import { useApiClient } from "../../../providers/api/apiContext.hook";

const PostPage: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post>();
    const [responses, setResponses] = useState<Response[]>([])
    const apiClient = useApiClient();

    const creationDate = new Date(post?.creationDate ?? "")
    const formattedDate = creationDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
    });

    useEffect(() => {
        getPostByIdREST(apiClient, postId ?? "").then((post) => {
          setPost(post);
          setResponses(post.responses);
        });
        
      }, [apiClient, postId]);

    return (
        <div className="max-w-screen-lg mx-auto">
            <div className="flex bg-white p-4 mb-4 shadow-md rounded-md">
                {/* Author Section */}
                <div className="mr-4">
                    <p className="font-bold">{post?.author.username}</p>
                </div>
            
                {/* Post Details Section */}
                <div>
                    {/* Topic */}
                    <p className="text-blue-500 font-bold">{post?.title}</p>
                    
                    {/* Creation Date */}
                    <p className="text-gray-500">{formattedDate}</p>
            
                    {/* Content */}
                    <div className="mt-2">
                    <p>{post?.content}</p>
                    </div>
                </div>
            </div>
            <div>
                <h1>Responses</h1>
                {responses.length}
            </div>
        </div>
    );
};
  
export default PostPage;