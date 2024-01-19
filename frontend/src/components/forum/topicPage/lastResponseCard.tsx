import React  from "react";
import { Response } from "../../../providers/currentUser/currentUser.type";

interface LastResponseCustomProps {
    response: Response;
}

const LastResponseCard: React.FC<LastResponseCustomProps> = ({ response }) => {

    const dateOfCreation = new Date(response.creationDate ?? "")
    const formattedDate = dateOfCreation.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
    });

    return (
        <div className="flex">
            <img
                src={response.author.profilePicture}
                alt="Profile"
                className="w-11 h-11 rounded-full mr-4"
            />
            <div>
                <h2 className="text-xl font-bold">{response.author.username}</h2>
                <p className="text-gray-600">{formattedDate}</p>
            </div>
      </div>
    );
};
  
export default LastResponseCard;