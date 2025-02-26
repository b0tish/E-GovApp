import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
 const OtherContact = () => {
  const [user, setUser] = useState(null);
  const {name}=useParams();

  useEffect(() => {
    const fetchDataByName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getuserbyname/${name}`);
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

    fetchDataByName();
  }, []);

  if (!user) {
    return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
  }

  return (
    <>


<div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2  border-blue-300 pb-2">
        📌 Contact Info for {user.name}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="col-span-2 space-y-8">
        <p className="text-lg">
            <strong className="text-blue-600 ">Level:</strong>{" "}
            {user.level || "N/A"}
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Email:</strong>{" "}
            {user.email || "N/A"}
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Name:</strong>{" "}
            {user.name || "N/A"}
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Contact Number:</strong>{" "}
            {user.contactNumber|| "N/A"}
          </p>
    
        </div>
        <div className="col-span-3 bg-red-500 min-h-[400px]">
         <form className="bg-red-500 h-10">

         </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default OtherContact;
