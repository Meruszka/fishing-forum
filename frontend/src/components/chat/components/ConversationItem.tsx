import { ReactElement } from "react"
import { Conversation, ConversationMember } from ".././chat.types";
import { useCurrentUser } from "../../../providers/currentUser/currentUser.hook";
import { useApiClient } from "../../../providers/api/apiContext.hook";
import { markAsRead } from "../chat.service";


interface ConversationItemProps {
    conversation: Conversation;
    setSelectedUser: (user: ConversationMember) => void;
}

const ConversationItem = (props: ConversationItemProps): ReactElement => {
    const { conversation, setSelectedUser } = props;

    const { members, lastMessage } = conversation;
    const currentUser = useCurrentUser();
    const otherMembers = members.filter(member => member._id !== currentUser?._id);
    const isConversationUnread = conversation.lastMessage.isRead === false && conversation.lastMessage.sender._id !== currentUser?._id;
    const { apiClient } = useApiClient();

    function openConversation() {
        setSelectedUser(otherMembers[0]);
        if (isConversationUnread) {
            markAsRead(apiClient, conversation._id);
        }
    }

    const lastMessageContent = lastMessage.sender._id === currentUser?._id
        ? (<><span className="text-gray-400">You:</span> {lastMessage.content}</>)
        : lastMessage.content;

    return (
        <div 
        className="flex items-center p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => openConversation()}>
            <div className="flex-shrink-0 mr-3 relative">
                <img
                    src={otherMembers[0]?.profilePicture || 'default-profile.png'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
            </div>
            <div className="flex-grow">
                <h5 className="font-bold">{otherMembers.map(member => member.username).join(', ')}</h5>
                <p className="text-sm text-gray-600">{lastMessageContent}</p>
            </div>
            <div className="text-right">
                <span className="text-xs text-gray-500">{new Date(lastMessage.date).toLocaleDateString()}</span>
                {isConversationUnread && (
                    <div className="mt-1 text-xs font-bold text-blue-500 animate-pulse">Unread</div>
                )}
            </div>
        </div>
    );
};

export default ConversationItem;