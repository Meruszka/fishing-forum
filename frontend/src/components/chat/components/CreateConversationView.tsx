import { ConversationMember } from "../chat.types";


interface CreateConversationViewProps {
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectUser: (user: ConversationMember) => void;
    searchTerm: string;
    searchResults: ConversationMember[];
}

const CreateConversationView = ({ handleSearchChange, handleSelectUser, searchTerm, searchResults }: CreateConversationViewProps) => (
    <div className="p-4">
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search user..."
            className="w-full p-2 border rounded-lg"
        />
        <div className="mt-2">
            {searchResults.map(user => (
                <div
                    key={user._id}
                    onClick={() => handleSelectUser(user)}
                    className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                >
                    <img
                        src={user.profilePicture || 'default-profile.png'}
                        alt={user.username}
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <span>{user.username}</span>
                </div>
            ))}
        </div>
    </div>
);

export default CreateConversationView;