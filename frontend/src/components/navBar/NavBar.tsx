import React, { ReactElement, useState } from "react";
import LinkCustom from "../linkCustom/LinkCustom";

function NavBar(): ReactElement {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <LinkCustom to="/">
          <div className="text-white font-bold text-xl">Your Logo</div>
        </LinkCustom>
        <div className="flex space-x-4">
          <LinkCustom to="/">Home</LinkCustom>
          <LinkCustom to="/fishing-spots">Fishing Spots</LinkCustom>
          <LinkCustom to="/contact">Contact</LinkCustom>
          <LinkCustom to="/login">Login</LinkCustom>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
