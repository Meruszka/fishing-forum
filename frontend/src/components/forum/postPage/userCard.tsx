import React, { useState, useEffect } from "react";
import { User } from "../../../providers/currentUser/currentUser.type";
import { getUserById } from "../topicPage/topicPage.service";
import { useApiClient } from "../../../providers/api/apiContext.hook";

interface UserCardCustomProps {
    userId: string;
}

const UserCard: React.FC<UserCardCustomProps> = ({ userId }) => {
    const [user, setUser] = useState<User>();
    const {apiClient} = useApiClient();

    const dateOfRegistration = new Date(user?.dateOfRegistration ?? "")
    const formattedDate = dateOfRegistration.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
    });

    useEffect(() => {
      userId.length > 0 &&
        getUserById(apiClient, userId).then((user) =>{
            setUser(user);
        });
        
    }, [apiClient, userId]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <img
              src={user?.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{user?.username}</h2>
              <p className="text-gray-600">{`user since: ${formattedDate}`}</p>
            </div>
          </div>
    
          <p className="text-gray-700 mb-4">{user?.description}</p>
    
          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span> {user?.location}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Number of Posts:</span> {user?.posts.length}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Number of Badges:</span> {user?.badges.length}
            </p>
          </div>
    
          <div>
            <p className="text-gray-600">
              <span className="font-semibold">Score:</span> {user?.score}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Rank:</span> {user?.rank}
            </p>
          </div>
        </div>
      );
};
  
export default UserCard;