import React, { ReactElement, useEffect, useState } from "react";
import LinkCustom from "../../common/linkCustom/LinkCustom.component";
import { useApiClient } from "../../providers/api/apiContext.hook";
import Logo from "../../../public/logo.png";
import { useCurrentUser } from "../../providers/currentUser/currentUser.hook";

const Navbar: React.FC = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const apiClient = useApiClient();
  const user = useCurrentUser();

  useEffect(() => {
    setIsLoggedIn(apiClient.isLogged());
  }, [apiClient]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logout = () => {
    apiClient.logout();
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <LinkCustom to="/">
          <div className="text-white font-bold text-xl">
            <img
              src={Logo}
              alt="logo"
              className="w-10 h-10"
            />
          </div>
        </LinkCustom>
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
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <LinkCustom
                    to="/user-profile"
                    className="block px-4 py-2 text-gray-800"
                  >
                    Profile
                  </LinkCustom>
                  <LinkCustom
                    handleClick={logout}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
