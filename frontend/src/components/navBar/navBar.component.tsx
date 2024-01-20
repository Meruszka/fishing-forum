import React, { ReactElement, useState, useRef, useEffect } from "react";
import LinkCustom from "../../common/linkCustom/LinkCustom.component";
import { useApiClient } from "../../providers/api/apiContext.hook";
import Logo from "../../../public/logo.png";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";
import { useNavigate } from "react-router-dom";
import { useWebsocket } from "../../providers/websocket/websocket.hook";
import SearchComponent from "./search.component";

const Navbar: React.FC = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { apiClient, isLoggedIn, setIsLoggedIn } = useApiClient();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { onlineCount } = useWebsocket();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    apiClient.logout();
    setIsLoggedIn(false);
    handleClick();
  };

  const handleClick = (to?: string) => {
    if (to) {
      navigate(to);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4 w-full h-18">
      <div className="container m-auto flex justify-between items-center">
        <div className="flex flex-row">
          <LinkCustom to="/" className="mr-2">
            <div className="text-white font-bold text-xl">
              <img src={Logo} alt="logo" className="w-10 h-10" />
            </div>
          </LinkCustom>
          <div>
            <SearchComponent />
          </div>
        </div>
        <div className="flex space-x-4">
          <LinkCustom to="/fishing-spots">Fishing Spots</LinkCustom>
          <LinkCustom to="/">Forum</LinkCustom>
          <LinkCustom to="/contact">Contact</LinkCustom>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="focus:outline-none h-full"
              >
                <img
                  src={user?.profilePicture}
                  alt="XD"
                  className="w-8 h-8 rounded-full"
                />
              </button>
              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20"
                >
                  <LinkCustom
                    to={`/user-profile/${user?._id}`}
                    className="block px-4 py-2 text-gray-800"
                  >
                    Profile
                  </LinkCustom>
                  <LinkCustom
                    handleClick={handleLogout}
                    className="block px-4 py-2 text-gray-800"
                  >
                    Logout
                  </LinkCustom>
                </div>
              )}
            </div>
          ) : (
            <LinkCustom to="/login">Login</LinkCustom>
          )}
          {isLoggedIn && (
            <LinkCustom>
              <>
                Online: <span className="text-green-500">{onlineCount}</span>
              </>
            </LinkCustom>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
