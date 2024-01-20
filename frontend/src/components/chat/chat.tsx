import { useEffect, useState } from "react"
import { getConversations, getUsers } from "./chat.service";
import { Conversation, ConversationMember, Message, WebsocketMessage } from "./chat.types";
import { useApiClient } from "../../providers/api/apiContext.hook";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import ConversationView from "./components/ConversationView";
import ConversationsList from "./components/ConversationList";
import CreateConversationView from "./components/CreateConversationView";
import { useWebsocket } from "../../providers/websocket/websocket.hook";
import ButtonCustom from "../../common/buttonCustom/buttonCustom.component";
import { IoMdClose } from "react-icons/io";
import ProfileLinkCustom from "../../common/profileLinkCustom/profileLinkCustom.component";

let searchTimeout: number | null = null;

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [shouldUpdateConversations, setShouldUpdateConversations] =
    useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ConversationMember[]>([]);
  const [selectedUser, setSelectedUser] = useState<ConversationMember | null>(
    null
  );
  const { apiClient, isLoggedIn } = useApiClient();
  const [newWebsocketMessage, setNewWebsocketMessage] =
    useState<WebsocketMessage | null>(null);
  const currentUser = useCurrentUser();
  const { val: websocketMessage } = useWebsocket();

  useEffect(() => {
    if (websocketMessage) {
      setNewWebsocketMessage(websocketMessage);
    }
  }, [websocketMessage]);

  useEffect(() => {
    if (newWebsocketMessage) {
      const { action, data } = newWebsocketMessage;
      if (action === "newMessage") {
        const { conversationId, message } = data;
        const updatedConversations = conversations.map((conversation) => {
          // if user is in the conversation with selectedUser (same sender)
          // mark as read
          const newMessage = {
            ...message,
            isRead: conversation.members.some(
              (member) => member._id === selectedUser?._id
            ),
          };
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
              lastMessage: newMessage,
            };
          }
          return conversation;
        });
        setNewWebsocketMessage(null);
        setConversations(updatedConversations);
      } else if (action === "markAsRead") {
        const { conversationId } = data;
        const updatedConversations = conversations.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                isRead: true,
              },
            };
          }
          return conversation;
        });
        setNewWebsocketMessage(null);
        setConversations(updatedConversations);
      }
    }
  }, [newWebsocketMessage, conversations, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      setShouldUpdateConversations(true);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser && shouldUpdateConversations) {
      const updatedConversations = conversations.map((conversation) => {
        if (
          conversation.members.some((member) => member._id === selectedUser._id)
        ) {
          return {
            ...conversation,
            lastMessage: {
              ...conversation.lastMessage,
              isRead: true,
            },
          };
        }
        return conversation;
      });
      setConversations(updatedConversations);
      setShouldUpdateConversations(false);
    }
  }, [selectedUser, shouldUpdateConversations, conversations]);

  useEffect(() => {
    getConversations(apiClient).then(setConversations);
  }, [apiClient]);

  const handleStartNewConversation = () => {
    setIsCreating(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length < 3) {
      setSearchResults([]);
      return;
    }

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      getUsers(apiClient, event.target.value).then((results) => {
        setSearchResults(
          results.filter((user) => user._id !== currentUser?._id)
        );
      });
    }, 500);
  };

  const handleSelectUser = (user: ConversationMember) => {
    setIsCreating(false);
    setSelectedUser(user);
  };

  const addMessage = (conversationId: string, message: Message) => {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation._id === conversationId) {
        return {
          ...conversation,
          messages: [...conversation.messages, message],
          lastMessage: message,
        };
      }
      return conversation;
    });
    setConversations(updatedConversations);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
    setIsCreating(false);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col transition-opacity duration-300 ${
          isChatOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex-none p-2 border-b border-gray-300 flex items-center justify-between">
          {selectedUser ? (
            <div className="flex items-center">
              <ProfileLinkCustom
                imageUrl={selectedUser.profilePicture || "default-profile.png"}
                to={`/user-profile/${selectedUser._id}`}
                alt="Profile Picture"
                type="small"
                className="mr-2"
              />
              <h2 className="font-bold">{selectedUser.username}</h2>
            </div>
          ) : (
            <h2 className="font-bold">Chat</h2>
          )}
          <ButtonCustom
            type="close"
            onClick={
              selectedUser || isCreating
                ? handleBackClick
                : () => setIsChatOpen(false)
            }
          >
            <IoMdClose />
          </ButtonCustom>
        </div>

        <div className="flex-1 overflow-y-auto">
          {selectedUser ? (
            <ConversationView user={selectedUser} addMessage={addMessage} />
          ) : isCreating ? (
            <CreateConversationView
              handleSearchChange={handleSearchChange}
              handleSelectUser={handleSelectUser}
              searchTerm={searchTerm}
              searchResults={searchResults}
            />
          ) : (
            <ConversationsList
              conversations={conversations}
              setSelectedUser={setSelectedUser}
            />
          )}
        </div>

        {!selectedUser && !isCreating && (
          <div className="flex-none p-4">
            <ButtonCustom
              className="transition-transform duration-200 ease-in-out transform hover:scale-105"
              type="add"
              onClick={handleStartNewConversation}
            >
              New Conversation
            </ButtonCustom>
          </div>
        )}
      </div>
      <ButtonCustom
        className={`transition-transform transition-opacity duration-300 ease-in-out transform hover:scale-105 fixed bottom-4 right-4 ${
          isChatOpen
            ? "opacity-0 pointer-events-none scale-0"
            : "opacity-100 scale-100"
        }`}
        type="default"
        onClick={() => setIsChatOpen(true)}
      >
        Open Chat
      </ButtonCustom>
    </>
  );
};

export default Chat