import { ReactElement, useEffect, useRef, useState } from "react"
import { getConversation, sendMessage } from ".././chat.service";
import { ConversationMember, Message } from "../chat.types";
import { useApiClient } from "../../../providers/api/apiContext.hook";
import { User } from "../../../providers/currentUser/currentUser.type";
import { useCurrentUser } from "../../../providers/currentUser/currentUser.hook";

interface MessageItemProps {
    message: Message;
    user: ConversationMember;
    currentUser: User | null;
}

const MessageItem = (props: MessageItemProps): ReactElement => {
    const { message, currentUser } = props;

    const { content, date, sender, isRead } = message;
    const isCurrentUser = sender._id === currentUser?._id;

    return (
        <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} p-2`}>
            <div className={`max-w-xs bg-white rounded-lg shadow px-4 py-2 ${isCurrentUser ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-600">{content}</p>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                        {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isCurrentUser && (
                        <span className={`text-xs ml-2 ${isRead ? 'text-green-500' : 'text-red-500'}`}>
                            {isRead ? '✓' : '•'}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

interface ConversationViewProps {
    user: ConversationMember;
}

const ConversationView = (props: ConversationViewProps): ReactElement => {
    const { user } = props;

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const { apiClient } = useApiClient();
    const currentUser = useCurrentUser();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getConversation(apiClient, user._id).then(data => {
            setMessages(data.messages);
        });
    }, [apiClient, user, currentUser?._id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage) {
            return;
        }
        sendMessage(apiClient, { interlocutorId: user._id, content: newMessage })
            .then(newMessage => {
                const message = {
                    ...newMessage,
                    sender: {
                        _id: currentUser?._id,
                        username: currentUser?.username
                    }
                } as Message;
                setMessages([...messages, message]);
            });
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-2">
                {messages.map((message, index) => (
                    <MessageItem key={index} message={message} currentUser={currentUser} user={user} />

                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white">
                <div className="flex">
                    <input
                        type="text"
                        value={newMessage}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow p-2 border rounded-l-lg"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg flex items-center"
                    >
                        <svg className="w-4 h-4 ml-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConversationView;