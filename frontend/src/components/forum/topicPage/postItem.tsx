import React from "react";
import { Post } from "../../../providers/currentUser/currentUser.type";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LastResponseCard from "./lastResponseCard";
import { ImBin } from "react-icons/im";
import ButtonCustom from "../../../common/buttonCustom/buttonCustom.component";

interface PostCustomProps {
    post: Post;
    currentUserId: string | undefined;
}

const PostItem: React.FC<PostCustomProps> = ({ post, currentUserId }) => {
  const creationDate = new Date(post.creationDate)
  const formattedDate = creationDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
  });
  const { topicId } = useParams<{ topicId: string }>();

  const scrollToBottom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.scrollTo(0, document.body.scrollHeight);
  };

    return (
        <div className="max-w-screen-lg mx-auto"> 
          <div className="bg-white p-4 mb-4 shadow-md rounded-md">
            <Link to={`/forum/topics/${topicId}/post/${post._id}`} className="block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p 
                  className="text-gray-600 mb-2 flex">{`by ${post.author?.username}, ${formattedDate}`}
                  {currentUserId && post.author._id === currentUserId && 
                    <span className={"ml-2 self-center"}>
                      <ButtonCustom
                        onClick={scrollToBottom}
                      >
                        <ImBin />
                      </ButtonCustom>
                    </span>
                  }
                  </p>
                </div>
                <div className="flex items-end text-center gap-10 w-1/4"> 
                  <div className="flex flex-col items-center"> 
                    <div className="text-gray-700 mb-2">
                      Replies:
                    </div>
                    <div>
                      {post.responses.length}
                    </div>
                  </div>
                  <div className="self-center">
                    {post.lastResponse ? <LastResponseCard response={post.lastResponse}/> : post.responses.length > 0 ? <div>No last response data</div> : <div>No responses yet</div>}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
    );
};
  
export default PostItem;