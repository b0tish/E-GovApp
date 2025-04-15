import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const OtherContact = () => {
  const [user, setUser] = useState(null);
  const { name } = useParams();

  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    complaint: "",
  });

  useEffect(() => {
    const fetchDataByName = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getuserbyname/${name}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        setUser(result);
      } catch (err) {
        console.error("Fetch Error:", err.message);
      }
    };

    fetchDataByName();
  }, [name]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
  
    const complaintData = {
      name: user.name, // recipient
      level: user.level,
      yourName: formData.senderName,
      yourEmail: formData.senderEmail,
      complaintDescription: formData.complaint,
    };
  
    try {
      const response = await fetch("http://localhost:5000/addComplaint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(complaintData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }
  
      alert("Complaint submitted successfully!");
      setFormData({
        senderName: "",
        senderEmail: "",
        complaint: "",
      });
    } catch (error) {
      console.error("Submission Error:", error.message);
      alert("There was a problem submitting the complaint.");
    }
  };

  
  if (!user) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <div className="p-10">
      <Link to={`/contact/${user.level.toLowerCase()}`}>
        <button className="mb-4 flex justify-center mt-2 p-2 rounded-lg border-2 border-black hover:ring-2 hover:ring-black hover:!bg-red-100 transition duration-300 ease-in-out">
          Back
          <ArrowLeftIcon className="h-6 w-6 text-black mr-2" />
        </button>
      </Link>

      <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2 border-blue-300 pb-2">
          📌 Contact Info for {user.name}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left: Ministry/Contact Info */}
          <div className="col-span-2 space-y-4">
            <div>
              <label className="block text-blue-600 font-semibold mb-1">Level:</label>
              <input type="text" value={user.level} readOnly className="w-full p-2 border rounded bg-gray-100" />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">Name:</label>
              <input type="text" value={user.name} readOnly className="w-full p-2 border rounded bg-gray-100" />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">Email:</label>
              <input type="email" value={user.email} readOnly className="w-full p-2 border rounded bg-gray-100" />
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-1">Contact Number:</label>
              <input type="text" value={user.contactNumber} readOnly className="w-full p-2 border rounded bg-gray-100" />
            </div>
          </div>

          {/* Right: Complaint Form */}
          <div className="col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-300">
              <h4 className="text-lg font-semibold text-red-600 mb-2">📝 Submit Your Complaint</h4>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Name:</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Your Email:</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Complaint Description:</label>
                <textarea
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full p-2 border rounded resize-none"
                />
              </div>

              <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherContact;
