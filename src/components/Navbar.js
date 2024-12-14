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

        <span className="hidden font-kalam font-bold text-sm sm:contents">
          आर्थिक उपन्यास
        </span>
      </div>
      <div className="navBar">
        <ul className="flex flex-row font-concert text-base font-medium text-gray-700  space-x-1 space sm:space-x-6 lg:space-x-16 ">
          <Link
            to="/"
            onClick={() => setActive("Home")}
            className={`px-[25px] py-[8px] ${
              isActive === "Home" ? "active" : "inactive"
            }`}
          >
            <li>Home</li>
          </Link>
          <Link
            to="/contact"
            onClick={() => setActive("Contact")}
            className={`px-[25px] py-[8px] ${
              isActive === "Contact" ? "active" : "inactive"
            }`}
          >
            <li>Contact</li>
          </Link>
          <Link
            to="/about"
            onClick={() => setActive("About")}
            className={` px-[25px] py-[8px] ${
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
