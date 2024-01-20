import React, { useEffect, useRef, useState } from "react";
import { getUsers } from "./search.service";
import { useApiClient } from "../../providers/api/apiContext.hook";
import { ConversationMember } from "../chat/chat.types";
import LinkCustom from "../../common/linkCustom/LinkCustom.component";

let searchTimeout: number | null = null;

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ConversationMember[]>([]);
  const { apiClient } = useApiClient();
  const resultRef = useRef<HTMLDivElement>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultRef.current &&
        !resultRef.current.contains(event.target as Node)
      ) {
        setIsResultOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        setSearchResults(results);
        setIsResultOpen(true);
      });
    }, 500);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        onFocus={() => setIsResultOpen(true)}
        className="p-2 border border-gray-300 rounded shadow-sm w-full text-gray-800 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
      />
      {isResultOpen && (
        <div
          className="absolute top-full left-0 mt-1 bg-white w-full rounded shadow-lg z-10 overflow-hidden"
          ref={resultRef}
        >
          {searchResults.map((user) => (
            <LinkCustom
              key={user._id}
              className="flex items-center px-4 py-2 border-b border-gray-200 last:border-b-0 w-full hover:bg-gray-100"
              to={`/user-profile/${user._id}`}
            >
              <>
                <img
                  src={user.profilePicture}
                  alt={user.username}
                  className="rounded-full h-8 w-8 mr-2"
                />
                <span className="text-gray-800">{user.username}</span>
              </>
            </LinkCustom>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
