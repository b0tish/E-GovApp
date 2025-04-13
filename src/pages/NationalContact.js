import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const NationalContact = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    complaint: "",
  });

  useEffect(() => {
    const fetchDataByLevel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getuserfornational`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        setUser(result);
      } catch (err) {
        console.error("Fetch Error:", err.message);
      }
    };

    fetchDataByLevel();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Complaint:");
  };

  return (
    <div className="p-10">
      <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2 border-blue-300 pb-2">
          📌 Contact Info for Ministry of Finance
        </h3>

        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Contact Info Section */}
            <div className="col-span-2 space-y-4">
              <div>
                <label className="block text-blue-600 font-semibold mb-1">
                  Level:
                </label>
                <input
                  type="text"
                  value={user.level}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
            
              <div>
                <label className="block text-blue-600 font-semibold mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-blue-600 font-semibold mb-1">
                  Contact Number:
                </label>
                <input
                  type="text"
                  value={user.contactNumber}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
            </div>

            {/* Complaint Form Section */}
            <div className="col-span-3">
              <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-300"
              >
                <h4 className="text-lg font-semibold text-red-600 mb-2">
                  📝 Submit Your Complaint
                </h4>

                <input type="hidden" value={user.name} />
                <input type="hidden" value={user.level} />

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Complaint Description:
                  </label>
                  <textarea
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full p-2 border rounded resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Submit Complaint
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center text-xl font-semibold mt-10">
            No Information Found
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalContact;
