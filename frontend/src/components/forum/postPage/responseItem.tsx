import React from "react";
import { Response } from "../../../providers/currentUser/currentUser.type";
import UserCard from "./userCard";

interface ResponseCustomProps {
    response: Response;
    postTitle: string;
}

const ResponseItem: React.FC<ResponseCustomProps> = ({ response, postTitle }) => {
  const creationDate = new Date(response.creationDate)
  const formattedDate = creationDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
  });

    return (
        <div className="max-w-screen-lg mx-auto">
            <div className="flex bg-white p-4 mb-4 shadow-md rounded-md">
                <div className="mr-4 w-1/4">
                    <UserCard userId={response.author._id ?? ""}/>
                </div>
                <div>
                    <p className="text-gray-600 font-bold">{`Re:${postTitle}`}</p>
                    <p className="text-gray-500">{formattedDate}</p>
                    <div className="mt-2">
                    <p>{response?.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default ResponseItem;