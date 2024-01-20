import React from "react";
import { Response } from "../../../providers/currentUser/currentUser.type";
import UserCard from "./userCard";
import { ImBin } from "react-icons/im";
import ButtonCustom from "../../../common/buttonCustom/buttonCustom.component";
import { deleteResponseById } from "../topicPage/topicPage.service";
import { useApiClient } from "../../../providers/api/apiContext.hook";

interface ResponseCustomProps {
    response: Response;
    postTitle: string;
    currentUserId: string | undefined;
    onDeleteHandler: (responseId: string) => void;
}

const ResponseItem: React.FC<ResponseCustomProps> = ({ response, postTitle, currentUserId, onDeleteHandler }) => {
  const { apiClient } = useApiClient()
  const creationDate = new Date(response.creationDate)
  const formattedDate = creationDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const confirmation = window.confirm("Are you sure you want to delete this response?")
    if(confirmation) {
      deleteResponseById(apiClient, response.post._id, response._id).then(()=>{
        onDeleteHandler(response._id)
      })
    }
  }

    return (
      <div className="max-w-screen-lg mx-auto">
        <div className="flex bg-white p-4 mb-4 shadow-md rounded-md">
          <div className="mr-4 w-1/4">
            <UserCard userId={response.author._id ?? ""} usr={null} />
          </div>
          <div className="w-3/4">
            <p className="text-gray-600 font-bold break-all">{`Re:${postTitle}`}</p>
            <p className="text-gray-500">{formattedDate}</p>
            <div className="mt-2 break-all">
              <p>{response?.content}</p>
            </div>
          </div>
          {currentUserId && response.author._id === currentUserId && 
            <span className={"ml-2 self-center"}>
              <ButtonCustom onClick={handleDelete}> <ImBin /> </ButtonCustom>
            </span>
          }
        </div>
      </div>
    );
};
  
export default ResponseItem;