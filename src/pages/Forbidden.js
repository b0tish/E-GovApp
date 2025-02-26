import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">403 Forbidden</h1>
      <p className="mt-4 text-lg text-gray-700">
        You do not have permission to access this page.
      </p>
      <button
        onClick={() => navigate("/home")} // Navigate to the homepage
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Forbidden;
