import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const NationalContact = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDataByLevel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getuserfornational`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Fetched Data:", result); // Debugging log

        setUser(result); // Set state with the single user object
      } catch (err) {
        console.error("Fetch Error:", err.message);
      }
    };

    fetchDataByLevel();
  }, []);

  return (
      <div className="p-10">
        <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2  border-blue-300 pb-2">
            📌 Contact Info for Ministry of Finance
          </h3>
          {user?(<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="col-span-2 space-y-8">
              <p className="text-lg">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 text-blue-600"
                />
                <strong className="text-blue-600 ">Email:</strong>{" "}
                {user.email || "N/A"}
              </p>
              <p className="text-lg">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2 text-blue-600"
                />
                <strong className="text-blue-600 ">Contact Number:</strong>{" "}
                {user.contactNumber || "N/A"}
              </p>
            </div>
            <div className="col-span-3 bg-red-500 min-h-[400px]">
              <form className="bg-red-500 h-10"></form>
            </div>
          </div>):(<div className="text-center text-xl font-semibold mt-10">No Information Found</div>)}

          
        </div>
      </div>

  );
};

export default NationalContact;
