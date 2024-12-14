<<<<<<< HEAD
const Navbar = () => {
  return ( 
    <></>
   );
}
 
export default Navbar;
=======
import React, { useState } from "react";
import {Link} from "react-router-dom";
import "../css/Navbar.css";
import logo from "../images/logo.png";

function Navbar() {
  const [isActive ,setActive] =useState("Home");

  return (
    <nav className="flex justify-between px-10 py-3 border-b-2 border-gray-100 items-center shadow-sm">
      <div className="logo flex flex-row space-x-2 items-center">
        <img src={logo} alt="logo" className="h-10"></img>
        <span className="hidden font-serif font-bold text-sm sm:contents">
          Aarthik Upanyas
        </span>
      </div>
      <div className="navBar">
        <ul className="flex flex-row space-x-12 font-sans text-base font-medium text-gray-900 ">
          <Link
            to="/"
            onClick={() => setActive("Home")}
            className={`px-[15px] py-[8px] ${
              isActive === "Home" ? "active" : "inactive"
            }`}
          >
            <li>Home</li>
          </Link>
          <Link
            to="/contact"
            onClick={() => setActive("Contact")}
            className={`px-[15px] py-[8px] ${
              isActive === "Contact" ? "active" : "inactive"
            }`}
          >
            <li>Contact</li>
          </Link>
          <Link
            to="/about"
            onClick={() => setActive("About")}
            className={` px-[15px] py-[8px] ${
              isActive === "About" ? "active" : "inactive"
            }`}
          >
            <li>About Us</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
>>>>>>> db5647f3e9fd634e570db4503022eae4aea8daee
