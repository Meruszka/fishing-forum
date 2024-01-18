import React, { ReactElement } from "react";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import {
  Badge,
  Friend,
  Gear,
  Post,
} from "../../providers/currentUser/currentUser.type";
import LoadingScreen from "../../common/loadingScreen/loadingScreen.component";
import ToolTipCustom from "../../common/toolTipCustom/toolTipCustom.component";
import { getDisplayDate } from "../../common/utils/Date.utils";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = (): ReactElement => {
  const user = useCurrentUser();
  const navigate = useNavigate();

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className="w-20 h-20 rounded-full"
          />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">{user.username}</h1>
          <p className="text-gray-500">
            Member since {getDisplayDate(user.dateOfRegistration)}
          </p>
          <div className="mt-4">
            <p className="text-gray-700 mt-2">{user.description}</p>
            <p className="text-gray-700 mt-2">Location: {user.location}</p>
            <p className="text-gray-700 mt-2">Score: {user.score}</p>
            <p className="text-gray-700 mt-2">Rank: {user.rank}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <ul className="list-disc ml-6">
          {user.posts.map((post: Post) => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="flex space-x-4">
          {user.badges.map((badge: Badge) => (
            <ToolTipCustom content={badge.name} position="right">
              <img
                key={badge._id}
                src={badge.icon}
                alt={badge.name}
                className="w-10 h-10"
              />
            </ToolTipCustom>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className=" mb-4 flex items-center">
          <div className="text-xl font-semibold">Gear</div>
          <ToolTipCustom
            content="Add gear"
            position="right"
            className="text-xs flex"
          >
            <ButtonCustom
              className="ml-4 text-xl"
              onClick={() => {
                navigate("/gear/add");
              }}
            >
              <IoAdd />
            </ButtonCustom>
          </ToolTipCustom>
        </div>
        <ul className="list-disc ml-6">
          {user.gear.map((gear: Gear) => (
            <li key={gear._id}>{gear.name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Friends</h2>
        <ul className="flex space-x-4">
          {user.friends.map((friend: Friend) => (
            <li key={friend._id}>
              <div className="flex flex-col items-center">
                {friend.username}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
