import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";

const Complaint = () => {
    const navigate=useNavigate();
  const { level, name } = useParams();
  const [complaintData, setComplaintData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const finalName = level.toLowerCase() === "national" ? "National" : name;

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await fetch(`http://localhost:5000/getComplaintByName/${finalName}`,{
            credentials: "include",
          });

        const data = await res.json();
        
        if (res.status === 403 || res.status===401) {
            navigate("/forbidden"); // Navigate to /forbidden if status is 403
            return; // Exit the function early
          }
        if (res.ok) {
          setComplaintData(data.complaints); // should be an array
        } else {
          console.error(data.message);
          setComplaintData([]);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setComplaintData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [finalName,navigate]);
  

  return (
    <div className="container mx-auto pb-10 px-4 lg:!px-16 font-poppins">
      <div className="text-center flex flex-col items-center">
        <div className="emblem w-[15%] md:w-[8%] mb-2">
          <img src="/emblem.png" alt="emblem" className="w-[100%]" />
        </div>
        <h2 className="text-base md:text-2xl font-bold mb-4">
          Welcome to the {finalName} Complaint Inbox
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2 border-blue-300 pb-2">
          📌 Complaints Info
        </h3>
        {loading && (<p>Loading...</p>)}

       {complaintData && complaintData.length>0? (
          <div className="space-y-6">
            {complaintData.map((complaint, index) => (
              <div
                key={complaint._id || index}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                {complaint.yourName && (<p>
                  <strong className="text-blue-600">Name:</strong> {complaint.yourName}
                </p>)}
                {complaint.yourEmail &&(<p>
                  <strong className="text-blue-600">Email:</strong> {complaint.yourEmail}
                </p>)}
            
                <p>
                  <strong className="text-blue-600">Complaint Description:</strong>
                </p>
                <p className="bg-gray-100 p-3 rounded mt-2">{complaint.complaintDescription}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 font-semibold">
            No complaints found for {finalName}.
          </p>
        )}
      </div>
    </div>
  );
};

export default Complaint;
