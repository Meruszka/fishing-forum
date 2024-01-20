import React, { ReactElement, useState, useEffect, useCallback } from "react";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import {
  Friend,
  Post,
  User
} from "../../providers/currentUser/currentUser.type";
import LoadingScreen from "../../common/loadingScreen/loadingScreen.component";
import ToolTipCustom from "../../common/toolTipCustom/toolTipCustom.component";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import UserCard from "../forum/postPage/userCard";
import { useParams } from 'react-router-dom';
import { useApiClient } from "../../providers/api/apiContext.hook";
import { getUserById } from "../forum/topicPage/topicPage.service";
import { addFriend, removeFriend } from "./userProfile.service";

const UserProfile: React.FC = (): ReactElement => {
  const { userId } = useParams<{ userId: string }>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMyFriend, setIsMyFriend] = useState<boolean>(false);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const currentUser = useCurrentUser();
  const {apiClient} = useApiClient();



  useEffect(() => {
    setIsLoggedIn(apiClient.isLoggedIn())
    if(userId) {
      getUserById(apiClient, userId).then((user) => {
        setUser(user)
      })
      if(isLoggedIn && currentUser) {
        if (currentUser._id === userId) {
          setIsCurrentUser(true)
          console.log(123)
        } else {
          setIsMyFriend(currentUser.friends.some((friend)=> friend.friend._id === userId))
        }
      }
    }
  }, [apiClient, isLoggedIn, currentUser, userId])

  const handleAddPostClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(userId) {
      if(!isMyFriend) {
        await addFriend(apiClient, userId);
        setIsMyFriend(true)
      } else {
        await removeFriend(apiClient, userId)
        setIsMyFriend(false)
      }
    }
  }, [apiClient, userId, isMyFriend]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="container mx-auto mt-8">
      <div>
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto"
        />
        <div className="text-center text-xl font-semibold mt-2">
          {user.username}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="mx-auto">
          <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
          <UserCard userId="" usr={user} />
        </div>
        <div className="mx-auto">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md">
            {user.posts.slice(0, 6).map((post: Post) => (
              <div
                key={post._id}
                className="flex bg-white p-4 h-16 w-32 justify-center items-center border-solid shadow-md"
              >
                <h2
                  key={post._id}
                  className="text-xs font-bold overflow-hidden whitespace-nowrap truncate"
                >
                  {post.title}
                </h2>
              </div>
            ))}
            {Array.from({ length: Math.max(0, 6 - user.posts.length) }).map(
              (_, index) => (
                <div
                  key={`empty-${index}`}
                  className="bg-white p-4 h-16 w-32 shadow-md"
                ></div>
              )
            )}
            {user.posts.length - 6 > 0 && (
              <div className="col-span-2 flex justify-end items-end text-xs">{`And ${
                user.posts.length - 6
              } more`}</div>
            )}
          </div>
        </div>

        <div className="mx-auto">
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {user.badges.length > 0 ? (
              <ToolTipCustom
                className="flex justify-center items-center"
                content={user.badges[0].name}
                position="right"
              >
                <img
                  src={user.badges[0].icon}
                  alt={user.badges[0].name}
                  className="w-10 h-10"
                />
              </ToolTipCustom>
            ) : (
              <div className="text-xs text-center">No badges</div>
            )}
            {user.badges.length - 1 > 0 && (
              <div className="text-xs text-center mt-4">{`And ${
                user.badges.length - 1
              } more`}</div>
            )}
          </div>
        </div>

        {/* <div className="mx-auto">
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
        </div> */}

        <div className="mx-auto">
          <h2 className="text-xl font-semibold mb-4">Friends</h2>
          <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-md mb-2">
            {user.friends
              .filter((e) => e.friend._id != user._id)
              .slice(0, 4)
              .map((friend: Friend) => (
                <div
                  key={friend._id}
                  className="flex bg-white p-4 h-16 w-32 justify-center items-center border-solid shadow-md"
                >
                  <h2
                    key={friend._id}
                    className="text-xs font-bold overflow-hidden whitespace-nowrap truncate"
                  >
                    {friend.friend.username}
                  </h2>
                </div>
              ))}
            {Array.from({ length: Math.max(0, 4 - user.friends.length) }).map(
              (_, index) => (
                <div
                  key={`empty-${index}`}
                  className="bg-white p-4 h-16 w-32 shadow-md"
                ></div>
              )
            )}
            {user.friends.length - 4 > 0 && (
              <div className="col-span-2 flex justify-end items-end text-xs">{`And ${
                user.friends.length - 4
              } more`}</div>
            )}
          </div>
          {!isCurrentUser && (
            <ButtonCustom
              label={isMyFriend ? "Remove Friend" : "Add Friend"}
              onClick={handleAddPostClick}
              type="login"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
