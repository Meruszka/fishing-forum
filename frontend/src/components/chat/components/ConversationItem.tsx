import { ReactElement } from "react"
import { Conversation, ConversationMember } from ".././chat.types";
import { useCurrentUser } from "../../../providers/currentUser/currentUser.hook";


const ConversationItem = ({ conversation, setSelectedUser }: { conversation: Conversation, setSelectedUser: (user: ConversationMember) => void }): ReactElement => {
    const { members, lastMessage } = conversation;
    const currentUser = useCurrentUser();
    const otherMembers = members.filter(member => member._id !== currentUser?._id);

    return (
        <div className="flex items-center p-3 border-b border-gray-300" onClick={() => setSelectedUser(otherMembers[0])}>
            <div className="flex-shrink-0 mr-3">
                <img
                    src={otherMembers[0]?.profilePicture || 'default-profile.png'} // 'default-profile.png' is a placeholder
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
            </div>
            <div className="flex-grow">
                <h5 className="font-bold">{otherMembers.map(member => member.username).join('')}</h5>
                <p className="text-sm text-gray-600">{lastMessage.content}</p>
            </div>
            <div className="text-right">
                <span className="text-xs text-gray-500">{new Date(lastMessage.date).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default ConversationItem;