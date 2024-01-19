import { ReactElement } from "react"
import { Conversation, ConversationMember } from "..//chat.types";
import ConversationItem from "../components/ConversationItem";


const ConversationsList = ({ conversations, setSelectedUser }: { conversations: Conversation[], setSelectedUser: (user: ConversationMember) => void }): ReactElement => {
    return (
        <div className="h-full overflow-y-auto">
            {conversations.map(conversation => (
                <ConversationItem key={conversation._id} conversation={conversation} setSelectedUser={setSelectedUser} />
            ))}
        </div>
    );
};

export default ConversationsList;