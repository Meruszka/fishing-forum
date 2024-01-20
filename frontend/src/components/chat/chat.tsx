import { useEffect, useState } from "react"
import { getConversations, getUsers } from "./chat.service";
import { Conversation, ConversationMember } from "./chat.types";
import { useApiClient } from "../../providers/api/apiContext.hook";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import ConversationView from "./components/ConversationView";
import ConversationsList from "./components/ConversationList";
import CreateConversationView from "./components/CreateConversationView";
import { useWebsocket } from "../../providers/websocket/websocket.hook";


let searchTimeout: number | null = null;

const Chat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ConversationMember[]>([]);
    const [selectedUser, setSelectedUser] = useState<ConversationMember | null>(null);
    const { apiClient, isLoggedIn } = useApiClient();
    const currentUser = useCurrentUser();
    const { val, clearMessage } = useWebsocket();

    useEffect(() => {
        if (val) {
            const { action, data } = val;
            if (action === 'newMessage') {
                console.warn('newMessage', data);
                const { conversationId, message } = data;
                const updatedConversations = conversations.map(conversation => {
                    if (conversation._id === conversationId) {
                        return {
                            ...conversation,
                            messages: [...conversation.messages, message],
                            lastMessage: message,
                        };
                    }
                    return conversation;
                });
                clearMessage();
                setConversations(updatedConversations);
            }
        }
    }, [val, conversations, clearMessage]);

    useEffect(() => {
        if (selectedUser) {
            const updatedConversations = conversations.map(conversation => {
                if (conversation.members.some(member => member._id === selectedUser._id)) {
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
        }
    }, [selectedUser, conversations]);

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
            getUsers(apiClient, event.target.value).then(results => {
                setSearchResults(results.filter(user => user._id !== currentUser?._id));
            })
        }, 500);
    };

    const handleSelectUser = (user: ConversationMember) => {
        setIsCreating(false);
        setSelectedUser(user);
    };

    const handleBackClick = () => {
        setSelectedUser(null);
        setIsCreating(false);
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4">
            {isChatOpen && (
                <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
                    <div className="flex-none p-2 border-b border-gray-300 flex items-center justify-between">
                        {selectedUser ? (
                            <div className="flex items-center">
                                <img
                                    src={selectedUser.profilePicture || 'default-profile.png'}
                                    alt={selectedUser.username}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <h2 className="font-bold">{selectedUser.username}</h2>
                            </div>
                        ) : (
                            <h2 className="font-bold">Chat</h2>
                        )}
                        <button
                            className="text-lg font-semibold"
                            onClick={selectedUser || isCreating ? handleBackClick : () => setIsChatOpen(false)}
                        >
                            X
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {selectedUser ? (
                            <ConversationView user={selectedUser} />
                        ) : isCreating ? (
                            <CreateConversationView
                                handleSearchChange={handleSearchChange}
                                handleSelectUser={handleSelectUser}
                                searchTerm={searchTerm}
                                searchResults={searchResults}
                            />
                        ) : (
                            <ConversationsList conversations={conversations} setSelectedUser={setSelectedUser} />
                        )}
                    </div>

                    {!selectedUser && !isCreating && (
                        <div className="flex-none p-4">
                            <button
                                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                onClick={handleStartNewConversation}
                            >
                                New Conversation
                            </button>
                        </div>
                    )}
                </div>
            )}

            {!isChatOpen && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => setIsChatOpen(true)}
                >
                    Open Chat
                </button>
            )}
        </div>
    );
};

export default Chat