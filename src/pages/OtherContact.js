import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { ArrowLeftIcon } from "lucide-react";

const OtherContact = () => {
  const [user, setUser] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchDataByName = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/getuserbyname/${name}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();

        setUser(result); // Set state with the single user object
      } catch (err) {
        console.error("Fetch Error:", err.message);
      }
    };

    fetchDataByName();
  }, [name]); // Added name as a dependency for re-fetching if it changes

  if (!user) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <div className="p-10">
      <Link to={`/contact/${user.level.toLowerCase()}`}>
        <button className=" mb-4 flex justify-center mt-2 p-2 rounded-lg border-2 border-black hover:ring-2 hover:ring-black hover:!bg-red-100 transition duration-300 ease-in-out">
          Back
          <ArrowLeftIcon className="h-6 w-6 text-black mr-2" />
        </button>
      </Link>
      <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2 border-blue-300 pb-2">
          📌 Contact Info for {user.name}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="col-span-2 space-y-8">
            <p className="text-lg">
              <FontAwesomeIcon icon={faStar} className="mr-2 text-blue-600" />
              <strong className="text-blue-600">Level :</strong>{" "}
              {user.level || "N/A"}
            </p>
            <p className="text-lg">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
              <strong className="text-blue-600">Name :</strong>{" "}
              {user.name || "N/A"}
            </p>
            <p className="text-lg">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="mr-2 text-blue-600"
              />
              <strong className="text-blue-600">Email :</strong>{" "}
              {user.email || "N/A"}
            </p>
            <p className="text-lg">
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-blue-600" />
              <strong className="text-blue-600">Contact Number :</strong>{" "}
              {user.contactNumber || "N/A"}
            </p>
          </div>
          <div className="col-span-3 bg-red-500 min-h-[400px]">
            <form className="bg-red-500 h-10">
              {/* Add form elements here */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherContact;
