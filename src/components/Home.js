import React from "react";
import Banner from "./Banner";
import nepalFlag from "../images/nepalFlag.jpg";

import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container">
        <Banner bgName={nepalFlag} />
        <div className="text-center">
          <h6 className="font-bold font-inter text-base sm:text-lg md:text-xl lg:text-2xl">
            Welcome to <span className="font-kalam">आर्थिक उपन्यास..!</span>
          </h6>
          <h1 className="font-poppins mt-2 text-gray-600 mb-4">
            Please select a role to get started.
          </h1>
          <div className="flex flex-col space-y-3">
            <Link to="/login">
              <button className="px-4 py-2 bg-red-600 text-white font-semibold font-inter rounded-xl shadow-md hover:bg-red-700 w-[60%] lg:w-[45%] xl:w-[35%] ">
                Government Official
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="px-4 py-2 bg-gray-200 text-black font-semibold font-inter rounded-xl shadow-2xl hover:bg-gray-300 w-[60%] lg:w-[45%] xl:w-[35%] ">
                Citizen
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
