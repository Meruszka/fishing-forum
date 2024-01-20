import { ReactElement } from "react"
import { Conversation, ConversationMember } from "../chat.types";
import ConversationItem from "../components/ConversationItem";

interface ConversationsListProps {
    conversations: Conversation[];
    setSelectedUser: (user: ConversationMember) => void;
}

const ConversationsList = (props: ConversationsListProps): ReactElement => {
    const { conversations, setSelectedUser } = props;
    
    return (
        <div className="h-full overflow-y-auto">
            {conversations.map(conversation => (
                <ConversationItem key={conversation._id} conversation={conversation} setSelectedUser={setSelectedUser} />
            ))}
        </div>
    );
};

export default ConversationsList;